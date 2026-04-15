const companyModel = require("../models/company.model");
const ApiError = require("../utils/ApiError");

const registerCompany = async (req, res, next) => {
  try {
    const {
      comp_id,
      comp_name,
      comp_type,
      comp_sub_type,
      comp_country,
      comp_admin_email,
      comp_admin_password,
    } = req.body;

    if (
      !comp_id ||
      !comp_name ||
      !comp_type ||
      !comp_sub_type ||
      !comp_country ||
      !comp_admin_email ||
      !comp_admin_password
    ) {
      throw new ApiError(400, "All fields required");
    }

    const company = await companyModel.createCompany(
      comp_id,
      comp_name,
      comp_type,
      comp_sub_type,
      comp_country,
      comp_admin_email,
      comp_admin_password,
    );
    res.success(company, "Company registered");
  } catch (err) {
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { first_name, last_name, user_email, user_password, comp_id } =
      req.body;

    if (
      !first_name ||
      !last_name ||
      !user_email ||
      !user_password ||
      !comp_id
    ) {
      throw new ApiError(400, "All fields required");
    }

    const company = await companyModel.createUser(
      first_name,
      last_name,
      user_email,
      user_password,
      comp_id,
    );
    res.success(company, "Company registered");
  } catch (err) {
    next(err);
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await companyModel.getCompanies();
    res.success(companies);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerCompany,
  registerUser,
  getAllCompanies,
};
