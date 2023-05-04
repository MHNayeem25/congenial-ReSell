const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ error: "Invalid email or password" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      // result == true
      if (result) {
        const token = jwt.sign(
          { userId: user._id, name: user.name, email },
          "jwtPrivateKey"
        );
        res.status(200).send({ token: token });
      }
    });
  } catch (error) {
    res.send({ error: error });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    //check if email already resitered
    // console.log(email, password, name);

    const userPresent = await User.findOne({ email: email });
    if (userPresent) {
      return res.status(400).send({
        error: "Email already registered",
      });
    }
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      const user = await User.create({
        email: email,
        password: hash,
        name: name,
      });

      res.status(200).send({
        message: "Registered Successfully",
        user: user,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

exports.addToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const id = req.headers["user-id"];
    const user = await User.findByIdAndUpdate(
      id,
      { token: token },
      { new: true }
    );
    res.status(201).send({
      message: "Added notification token",
      user: user,
    });
  } catch (error) {
    return error;
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId).select({
      password: 0,
      email: 0,
      token: 0,
    });
    // console.log(user);
    res.status(200).send({
      user,
    });
  } catch (error) {
    return error;
  }
};
