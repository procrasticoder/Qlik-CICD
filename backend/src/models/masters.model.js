const pool = require("../config/db");

const getAllCountries = async () => {
  const { rows } = await pool.query("SELECT * FROM country_master");
  return rows;
};

const getAllCompanyTypes = async () => {
  const { rows } = await pool.query("SELECT * FROM company_cat_master");
  return rows;
};

const getAllCompanySubTypes = async (companyCatId) => {
  const { rows } = await pool.query(
    "SELECT * FROM company_sub_cat_master where company_cat_id = $1",
    [companyCatId],
  );
  return rows;
};

module.exports = {
  getAllCountries,
  getAllCompanyTypes,
  getAllCompanySubTypes,
};
