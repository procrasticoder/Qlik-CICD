const models = require("../models/qlik-tenant-config.model");
const ApiError = require("../utils/ApiError");
const axios = require("axios");

async function validateQlikCredential(tenant_url, api_key) {
  try {
    const qlikUser = await axios({
      method: "GET",
      url: `${tenant_url}/api/v1/users/me`,
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    });
    return true;
  } catch (err) {
    return false;
  }
}

const qlikTenantConfig = async (req, res, next) => {
  const user_id = req.user.userId;
  try {
    const qlikTenantConfig = await models.qlikTenantConfig(user_id);
    res.success(qlikTenantConfig);
  } catch (err) {
    next(err);
  }
};

const qlikTenantSetup = async (req, res, next) => {
  const user_id = req.user.userId;
  try {
    const { qlik_tenant, qlik_api_key } = req.body;

    if (!qlik_tenant || !qlik_api_key) {
      throw new ApiError(400, "All fields required");
    }

    const qlik_tenant_setup = await models.qlikTenantSetup(
      user_id,
      qlik_tenant,
      qlik_api_key,
    );
    res.success(qlik_tenant_setup, "Qlik tenant setup successfully.");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  qlikTenantConfig,
  qlikTenantSetup,
};
