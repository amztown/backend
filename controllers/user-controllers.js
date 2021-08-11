const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    // const error = new HttpError(
    //   "Fetching users failed, please try again later.",
    //   500
    // );
    // return next(error);
    res.json({
      success: false,
      message: "Fetching users failed, please try again later",
    });
    return;
  }
  res.json({ users: users });
};

const signup = async (req, res, next) => {
  //   const errors = validationResult(req);

  //   if (!errors.isEmpty()) {
  //     return next(
  //       new HttpError("Invalid inputs passed, please check your data.", 422)
  //     );
  //   }

  const { username, email, password } = req.body;
  console.log(req.body);

  if (username && email && password) {
    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });

      if (existingUser) {
        // const error = new HttpError(
        //   "User exists already, please login instead.",
        //   422
        // );
        // return next(error);
        res.json({ message: "User Already Exists", success: false });
        return;
        //   console.log("user already exists");
      }
    } catch (err) {
      // const error = new HttpError(
      //   "Signing up failed, please try again later.",
      //   500
      // );
      // return next(error);
      res.status(500).json({
        message: "Signing up failed, please try again later.",
        success: false,
      });
      return;
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      // const error = new HttpError(
      //   "Could not create user, please try again.",
      //   500
      // );
      // return next(error);
      res.status(500).json({
        message: "Signing up failed, please try again later.",
        error: "500",
      });
      return;
    }

    const createdUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    try {
      createdUser.save();
    } catch (err) {
      // const error = new HttpError(
      //   "Signing up failed, please try again later.",
      //   500
      // );
      // return next(error);
      res.status(500).json({
        message: "Signing up failed, please try again later.",
        error: "500",
      });
      return;
    }

    let access_token;

    try {
      access_token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email },
        "myprivatekey",
        { expiresIn: "1h" }
      );
    } catch (err) {
      // const error = new HttpError(
      //   "Signing up failed, please try again later.",
      //   500
      // );
      // return next(error);
      res.status(500).json({
        message: "Signing up failed, please try again later.",
        error: "500",
      });
      return;
    }
    res.status(201).json({
      message: "user created",
      success: true,
      username: createdUser.username,
      email: createdUser.email,
      //password: createdUser.password,
      access_token: access_token,
      id: createdUser._id,
    });
  } else {
    res.json({ message: "Please Enter all the Details", success: false });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    // const error = new HttpError(
    //   "Logging in failed, please try again later.",
    //   500
    // );
    // return next(error);
    res.json({
      success: false,
      message: "Wrong Credentials",
    });
  }

  if (!existingUser) {
    // const error = new HttpError(
    //   "Logging in failed, please try again later.",
    //   500
    // );
    res.json({
      success: false,
      message: "User does not exist",
    });

    return;
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    // const error = new HttpError(
    //   "Could not log you in, please check your credentials and try again.",
    //   500
    // );
    // return next(error);
    res.json({
      success: false,
      message:
        "Could not log you in, please check your credentials and try again",
    });
    return;
  }

  if (!isValidPassword) {
    // const error = new HttpError(
    //   "Invalid credentials, could not log you in.",
    //   403
    // );
    // return next(error);
    res.json({
      success: false,
      message: "Password is invalid",
    });
    return;
  }

  let access_token;
  try {
    access_token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "myprivatekey",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    message: "you are login success fully ",
    username: existingUser.username,
    id: existingUser._id,
    // role: [existingUser.role],
    email: existingUser.email,
    access_token: access_token,
    success: true,
  });
};

module.exports = {
  getUsers,
  signup,
  login,
};
