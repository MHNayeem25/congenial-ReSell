const Message = require("../model/messageModel");
const User = require("../model/userModel");
const List = require("../model/listingModel");
const { Expo } = require("expo-server-sdk");
const sendPushNotification = require("../utilities/pushNotifications");

exports.getMessages = async (req, res, next) => {
  try {
    //get all messages recieved by current user

    const userId = req.query.userId;

    const messages = await Message.find({ toUserId: userId });

    res.status(200).send(messages);
  } catch (error) {
    return error;
  }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { listingId, message, senderId } = req.body;

    //find the listing for which the message has to be sent
    //listing contains userId-the person who has uploaded the listing
    const listing = await List.findOne({ _id: listingId });
    if (!listing) return res.status(400).send({ error: "Invalid listingId." });

    //find the user to whom the message has to be sent
    // console.log(listing);
    const targetUser = await User.findOne({ _id: listing.userId });
    // console.log(targetUser);
    const newMessage = await Message.create({
      fromUserId: senderId,
      toUserId: listing.userId,
      listingId,
      content: message,
      dateTime: Date.now(),
    });
    // console.log(newMessage);
    if (targetUser.token) {
      const { token: expoPushToken } = targetUser;

      if (Expo.isExpoPushToken(expoPushToken)) {
        await sendPushNotification(expoPushToken, message);
        res.status(201).send({ Message: "Successfully notified", newMessage });
      }
    }
    res.status(400).send({ Message: "Unsuccessful" });
  } catch (error) {
    return error;
  }
};

exports.delMessage = async (req, res, next) => {
  try {
    const { messageId } = req.body;
    // console.log(messageId);
    const message = await Message.findByIdAndDelete(messageId);
    // console.log(message);
    if (message) {
      res.status(200).send({
        Message: "Successfully removed",
      });
    }
  } catch (error) {
    return error;
  }
};
