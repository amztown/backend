const express = require("express");

const affiliateController = require("../controllers/affiliate-controllers");

const router = express.Router();

router.get("/", affiliateController.getCodes);

// router.post("/add", affiliateController.addCodes);
router.post("/edit", affiliateController.editCodes);

//ADD USER
// router.post("/adduser", usersController.addUser);

module.exports = router;
