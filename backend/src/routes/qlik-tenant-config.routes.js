const express = require("express");
const router = express.Router();
const controller = require("../controllers/qlik-tenant-config.controller");

const auth = require("../middleware/authenticate.middleware");
const authorizeRoles = require("../middleware/authorize.middleware");

router.get(
  "/config",
  auth,
  authorizeRoles("Admin"),
  controller.qlikTenantConfig,
);
router.post(
  "/setup",
  auth,
  authorizeRoles("Admin"),
  controller.qlikTenantSetup,
);

module.exports = router;
