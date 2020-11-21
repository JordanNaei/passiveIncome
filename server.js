// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");

const app = express();
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// // We need to use sessions to keep track of our user's login status
// app.use(
//   session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// Requiring our routes
// const routes = require("./controllers/controller.js");
// app.use(routes);


require("./controllers/controller.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("http://localhost:%s/ in your browser.", PORT, PORT);
    });
});