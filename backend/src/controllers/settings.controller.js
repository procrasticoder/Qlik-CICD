const settingsModel = require("../models/settings.model");
const ApiError = require("../utils/ApiError");

const getSettings = async (req, res, next) => {
  try {
    const { user_email } = req.body;

    if (!user_email) {
      throw new ApiError(400, "User email required");
    }
    const settings = await settingsModel.getSettings(user_email);
    res.success(settings);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getSettings,
};
