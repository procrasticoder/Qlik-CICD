const pool = require("../config/db");
const bcrypt = require("bcrypt");

const createCompany = async (
  comp_id,
  comp_name,
  comp_type,
  comp_sub_type,
  comp_country,
  comp_admin_email,
  comp_admin_password,
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let hashedPassword = await bcrypt.hash(comp_admin_password, 10);

    let query_company = `
      INSERT INTO company_details 
      (comp_id, comp_name, comp_type, comp_sub_type, comp_country, comp_admin_email)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    let query_user = `
      INSERT INTO user_details 
      (user_email, user_password, user_role, comp_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    let values_company = [
      comp_id,
      comp_name,
      comp_type,
      comp_sub_type,
      comp_country,
      comp_admin_email,
    ];

    let values_user = [comp_admin_email, hashedPassword, "Admin", comp_id];

    let { rows: companyRows } = await client.query(
      query_company,
      values_company,
    );
    let { rows: userRows } = await client.query(query_user, values_user);

    await client.query("COMMIT");

    console.log("Company created:", companyRows[0]);
    console.log("User created:", userRows[0]);

    return {
      company: companyRows[0],
      user: userRows[0],
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating company:", error);
    throw error;
  } finally {
    client.release();
  }
};

const createUser = async (
  first_name,
  last_name,
  user_email,
  user_password,
  comp_id,
) => {
  let client = await pool.connect();
  try {
    await client.query("BEGIN");

    let hashedPassword = await bcrypt.hash(user_password, 10);

    let query_user = `
      INSERT INTO user_details 
      (first_name, last_name, user_email, user_password, user_role, comp_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    let values_user = [
      first_name,
      last_name,
      user_email,
      hashedPassword,
      "Viewer",
      comp_id,
    ];

    let { rows: userRows } = await client.query(query_user, values_user);

    await client.query("COMMIT");

    console.log("User created:", userRows[0]);

    return {
      user: userRows[0],
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating company:", error);
    throw error;
  } finally {
    client.release();
  }
};

const getCompanies = async () => {
  const { rows } = await pool.query("SELECT * FROM company_details");
  return rows;
};

module.exports = {
  createCompany,
  createUser,
  getCompanies,
};
