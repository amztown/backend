const express = require("express");

const usersController = require("../controllers/user-controllers");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post("/register", usersController.signup);

//ADD USER
// router.post("/adduser", usersController.addUser);

router.post("/login", usersController.login);

module.exports = router;
