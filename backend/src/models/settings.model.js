const pool = require("../config/db");

const getSettings = async (userEmail) => {
  const { rows } = await pool.query(
    `SELECT u.user_email, u.first_name, u.last_name, c.comp_id,
        c.comp_name, cat.company_cat, scat.company_sub_cat, ctr.country_name,
        c.comp_qlik_tenant, c.comp_qlik_api_key
    FROM (SELECT * FROM user_details
        WHERE user_email = $1) u
    LEFT JOIN company_details c
    ON c.comp_id = u.comp_id
    LEFT JOIN country_master ctr
    ON c.comp_country = ctr.country_code
    LEFT JOIN company_cat_master cat
    ON c.comp_type = cat.company_cat_id
    LEFT JOIN company_sub_cat_master scat
    ON c.comp_sub_type = scat.company_sub_cat_id
    ;`,
    [userEmail],
  );
  return rows;
};

module.exports = {
  getSettings,
};
