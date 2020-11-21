const axios = require("axios");
const db = require('../models');


module.exports = function (app) {
  app.get("/", function (req, res) {

    db.iPhones.findAll({}).then(function (result) {
      var phones = { list: result};
    console.log(phones);
    // res.json(result)
    res.render("index", phones);
  });
})
}

