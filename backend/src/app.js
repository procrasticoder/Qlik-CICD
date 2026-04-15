const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const responseMiddleware = require("./middleware/response.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const companyRoutes = require("./routes/company.routes");
const countryRoutes = require("./routes/masters.routes");
const settingsRoutes = require("./routes/settings.routes");
const authRoute = require("./routes/auth.route");
const qlikTenantConfig = require("./routes/qlik-tenant-config.routes");

const auth = require("./middleware/authenticate.middleware");
const authorizeRoles = require("./middleware/authorize.middleware");

const app = express();

// core middlewares
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(morgan("dev"));

// custom middlewares
app.use(responseMiddleware);

// routes
app.use("/", authRoute);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/masters", countryRoutes);
app.use("/api/v1/settings", auth, settingsRoutes);
app.use("/api/v1/qlik-tenant", qlikTenantConfig);

// error handler (last)
app.use(errorMiddleware);

module.exports = app;
