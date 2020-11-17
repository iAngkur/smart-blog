require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const flash = require("connect-flash");
const config = require("config"); // eta amader config na, download kora

// Import Routes and Middleware from Route and Middleware Directory
const setMiddlewares = require("./middleware/middleware");
const setRoutes = require("./routes/routes");

/* Debug Module
const testConsole = require("debug")("app:test");
const dbConsole = require("debug")("app:db");

testConsole("this is a test console");
dbConsole("this is a db console");

Import Routes
const authRoutes = require("./routes/authRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
 */

/* Import Middleware
const { bindUserWithRequest } = require("./middleware/authMiddleware");
const setLocals = require("./middleware/setLocals");

Playground Routes
const validatorRoutes = require("./playground/validator"); // TODO Should be removed
*/
// const MONGODB_URI = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.kwh0m.mongodb.net/smart-blog`;

const MONGODB_URI = `mongodb+srv://${config.get("db-username")}:${config.get(
  "db-password"
)}@cluster0.kwh0m.mongodb.net/smart-blog`;

/* const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
    expires: 1000 * 60 * 60 * 2,
  });
  */
const app = express();

/* const config = require("./config/config");
 if (app.get("env").toLowerCase() === "development") {
  console.log(config.dev.name);
} else {
  console.log(config.dev.name);
}
*/

// eta amader config na, download kora
/* console.log(config.get("name"));
console.log(config.get("contacts.email")); */

// console.log(app.get("env"));
/* if (app.get("env").toLowerCase() === "development") {
  app.use(morgan("dev"));
} */

// Setup View Engine
app.set("view engine", "ejs");
app.set("views", "views"); // amr views folder ta views hisebe use korbe

// Middleware Array
/* const middleware = [
  // morgan("dev"),
  express.static("public"), // style gula j public folder e ase ta bole dilam
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    // secret: process.env.SECRET || "SECRET",
    secret: config.get("secret"),
    resave: false,
    saveUninitialized: false,
/*     cookie: {
      maxAge: 60 * 60 * 2 * 1000,
    }, */
//   store: store,
// }),
/*   bindUserWithRequest(), // alreday loggedIn obosthay ase kina
  setLocals(),
  flash(), */
// ]; */
// app.use(middleware);

/* Routes
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);
// app.use("/playground", validatorRoutes); // TODO Should be removed */

/* app.get("/", (req, res) => {
  res.json({
    message: "Hello!",
  });
}); */

// Using Middlewares from Middleware Directory
setMiddlewares(app);

// Using Routes from Route Directory
setRoutes(app);

// 404 Error Page Route Handling...
app.use((req, res, next) => {
  let error = new Error("404 Page Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (error.status === 404) {
    return res.render("pages/error/404", { flashMessage: {} });
  }
  console.log(error);
  res.render("pages/error/500", { flashMessage: {} });
});

const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected...");
      console.log("Server is running...");
    });
  })
  .catch((e) => {
    return console.log(e);
  });
