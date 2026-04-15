const express = require("express");
const router = express.Router();
const controller = require("../controllers/company.controller");

router.post("/register", controller.registerCompany);
router.post("/registerUser", controller.registerUser);
router.get("/", controller.getAllCompanies);

module.exports = router;
