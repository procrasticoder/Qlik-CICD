const pool = require("../config/db");

const qlikTenantConfig = async (user_id) => {
  const { rows } = await pool.query(
    "SELECT comp_qlik_tenant, comp_qlik_api_key FROM company_details where comp_admin_email = $1;",
    [user_id],
  );

  return rows;
};

const qlikTenantSetup = async (user_id, qlik_tenant, qlik_api_key) => {
  const { rows } = await pool.query(
    "UPDATE company_details SET comp_qlik_tenant = $1, comp_qlik_api_key = $2 where comp_id IN (Select comp_id from company_details where comp_admin_email = $3);",
    [qlik_tenant, qlik_api_key, user_id],
  );
  return rows;
};

module.exports = {
  qlikTenantConfig,
  qlikTenantSetup,
};
