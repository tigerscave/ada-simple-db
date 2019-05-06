const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5421;
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/public", express.static(__dirname + "/public"));

app.use(flash());

app.use(
  session({
    secret: "hogehoge",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index.ejs", { expressFlash: req.flash("info") });
});

app.get("/flash", (req, res) => {
  console.log("---flash---");
  req.flash("info", "This is a flash message using the express-flash module.");
  res.redirect("/");
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.get("/createUser", (req, res) => {
  res.render("createUser.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs", { flashMessage: req.flash("warning") });
});
app.post("/signup", db.signUpUser);

app.get("/login", (req, res) => {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    res.redirect("/account");
  } else {
    res.render("login.ejs");
  }
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login",
    failureFlash: true,
    session: true
  }),
  (req, res) => {
    if (res.body.remember) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect("/");
  }
);

app.get("/account", (req, res) => {
  console.log(req.isAuthenticated());
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("account.ejs", { user: req.user[0] });
  } else {
    res.redirect("/login");
  }
});

app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);

app.delete("/users/:id", db.deleteUser);

app.get("/logout", (req, res) => {
  console.log("isAuthenticated: ", req.isAuthenticated());
  req.logout();
  console.log("isAuthenticated: ", req.isAuthenticated());
  req.flash("info", "logout success");
  res.redirect("/");
});

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`App runnning on port ${port}.`);
});
