const Joi = require("joi");
const registerVerification = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  name: Joi.string(),
});

const messageVerification = Joi.object({
  listingId: Joi.string().required(),
  message: Joi.string().required(),
  senderId: Joi.string().required(),
});

module.exports = {
  registerVerification,
  messageVerification,
};
