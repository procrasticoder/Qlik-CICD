const masters = require("../models/masters.model");
const ApiError = require("../utils/ApiError");

const getAllCountries = async (req, res, next) => {
  try {
    const countries = await masters.getAllCountries();
    res.success(countries);
  } catch (err) {
    next(err);
  }
};

const getAllCompanyTypes = async (req, res, next) => {
  try {
    const companyTypes = await masters.getAllCompanyTypes();
    res.success(companyTypes);
  } catch (err) {
    next(err);
  }
};

const getAllCompanySubTypes = async (req, res, next) => {
  try {
    const { companyCatId } = req.query;
    const companySubTypes = await masters.getAllCompanySubTypes(companyCatId);
    res.success(companySubTypes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCountries,
  getAllCompanyTypes,
  getAllCompanySubTypes,
};
