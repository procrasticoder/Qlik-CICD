const express = require("express");
const router = express.Router();
const controller = require("../controllers/masters.controller");

router.get("/getAllCountries", controller.getAllCountries);
router.get("/getAllCompanyTypes", controller.getAllCompanyTypes);
router.get("/getAllCompanySubTypes", controller.getAllCompanySubTypes);

module.exports = router;
