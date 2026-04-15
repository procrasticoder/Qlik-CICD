const pool = require("../config/db");

const qlikConnect = () => {
  return (req, res, next) => {
    const { rows } = await pool.query(
    "SELECT comp_qlik_tenant, comp_qlik_api_key FROM company_details where comp_admin_email = $1;",
    [user_id],)
    
    if (!allowedRoles.includes(req.user.user_id)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};

module.exports = qlikConnect;
