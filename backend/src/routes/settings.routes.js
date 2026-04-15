const express = require("express");
const router = express.Router();
const controller = require("../controllers/settings.controller");

router.post("/", controller.getSettings);

module.exports = router;
