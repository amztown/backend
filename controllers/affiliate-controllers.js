const Affiliate = require("../Models/Affiliate");

const getCodes = async (req, res, next) => {
  let codes;
  try {
    codes = await Affiliate.find({}, "-password");
  } catch (err) {
    // const error = new HttpError(
    //   "Fetching codes failed, please try again later.",
    //   500
    // );
    // return next(error);
    res.json({
      success: false,
      message: "Fetching codes failed, please try again later",
    });
    return;
  }
  res.json({ codes: codes });
};

const editCodes = (req, res) => {
  console.log(req.body);

  const { id, code } = req.body;

  Affiliate.updateOne({ _id: id }, { $set: { code } }, function (err) {
    if (!err) {
      console.log("Code Updated");
      return res.json({ success: true, message: "Code Updated" });
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
  getCodes,
  editCodes,
};
