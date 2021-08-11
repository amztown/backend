const express = require("express");

const apikeyController = require("../controllers/apikey-controllers");

const router = express.Router();

router.get("/", apikeyController.getApiKey);

// router.post("/add", apikeyController.addApiKey);
router.post("/edit", apikeyController.editApiKey);

//ADD USER
// router.post("/adduser", usersController.addUser);

module.exports = router;
