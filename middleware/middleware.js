const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const config = require("config");
const MongoDBStore = require("connect-mongodb-session")(session);

// Our Middleware
const { bindUserWithRequest } = require("./authMiddleware");
const setLocals = require("./setLocals");

const MONGODB_URI = `mongodb+srv://${config.get("db-username")}:${config.get(
  "db-password"
)}@cluster0.kwh0m.mongodb.net/smart-blog`;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2,
});

const middleware = [
  morgan("dev"),
  express.static("public"), // style gula j public folder e ase ta bole dilam
  express.urlencoded({ extended: true }), // request body theke data extract kore, but multipart form er data extract korte pare na
  express.json(),
  session({
    secret: config.get("secret"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 2 * 1000,
    },
    store: store,
  }),
  flash(),
  bindUserWithRequest(), // alreday loggedIn obosthay ase kina
  setLocals(),
];

module.exports = (app) => {
  middleware.forEach((m) => {
    app.use(m);
  });
};
