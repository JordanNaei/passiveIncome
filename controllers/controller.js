const axios = require("axios");
const db = require('../models');


module.exports = function (app) {
  app.get("/", function (req, res) {

    db.User.findAll({}).then(function(result) {
      return res.json(result);
    });

    // res.render("index", {});
  });

}
