const Apikey = require("../Models/Apikey");

const getApiKey = async (req, res, next) => {
  let apiKey;
  try {
    apiKey = await Apikey.find({}, "-password");
  } catch (err) {
    // const error = new HttpError(
    //   "Fetching apiKey failed, please try again later.",
    //   500
    // );
    // return next(error);
    res.json({
      success: false,
      message: "Fetching apiKey failed, please try again later",
    });
    return;
  }
  res.json({ apiKey: apiKey });
};

const editApiKey = (req, res) => {
  console.log(req.body);

  const { id, apiKey } = req.body;

  Apikey.updateOne({ _id: id }, { $set: { apiKey } }, function (err) {
    if (!err) {
      console.log("apiKey Updated");
      return res.json({ success: true, message: "apiKey Updated" });
    } else {
      res.json({
        success: false,
        message: "Something went wrong",
      });
      return;
    }
  });
};

module.exports = {
  getApiKey,
  editApiKey,
};
