const axios = require("axios");
const db = require('../models');


module.exports = function (app) {

  app.get("/", function (req, res) {
    db.iPhones.findAll({}).then(function (result) {
      var phones = { list: result };
      console.log(phones);
      // res.json(result)
      res.render("index", phones);
    })
  })

  app.post("/api/jobs/:id", function (req, res) {
    db.iPhones.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      var asin_N = result.dataValues.asin_n;
      var upc_N = result.dataValues.upc_n;
      var queryURL = "https://api.priceapi.com/v2/jobs?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ";
      axios({
        method: 'post',
        url: queryURL,
        data: {
          source: "ebay",
          country: "us",
          topic: "product_and_offers",
          key: "gtin",
          values: upc_N,
          max_age: 43200,
          //     max_pages: 50,
          //     condition: "any",
        }
      }).then(function (response) {
        const jodId = response.data.job_id
        var queryJobURL = `https://api.priceapi.com/v2/jobs/${jodId}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        axios({
          method: 'Get',
          url: queryJobURL,
        }).then(function (response) {
          if (response.data.status == 'finished') {
            var queryURL = `https://api.priceapi.com/v2/jobs/${jodId}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
            axios({
              method: 'Get',
              url: queryURL,
            }).then(function (response) {
              console.log(response.data.results);
            })
          } else {
            console.log("we are calling back");
            getIt(queryJobURL, jodId)
          };
          // this is the get for the job status
        })
      })
      // this is the asin and upc end bracket
    })
    // app.post closing tag
  })

  // treating the json circular issue funtion to be based down with the res.json
const replacerFunc = () => {
  const visited = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (visited.has(value)) {
        return;
      }
      visited.add(value);
    }
    return value;
  };
};

async function getIt(url, id) {
  axios({
    method: 'Get',
    url: url,
  }).then(function (response) {
    console.log(response.data.status);
    if (response.data.status == 'finished') {
      var queryURL = `https://api.priceapi.com/v2/jobs/${id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
      axios({
        method: 'Get',
        url: queryURL,
      }).then(function (response) {
        console.log(response);
        res.json(response);
      })
    }
    else {
      getIt(url, id)
    };
  })
}


  // mod exp curly bracket
}









  // // Post route (adding new burger)
  // app.post("/api/jobs", function (req, res) {

  //   var queryURL = "https://api.priceapi.com/v2/jobs?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ";
  //   axios({
  //     method: 'post',
  //     url: queryURL,
  //     data: {
  //       source: "ebay",
  //       country: "us",
  //       topic: "product_and_offers",
  //       key: "gtin",
  //       values: "190198510426",
  //       max_age: 43200,
  //       //     max_pages: 50,
  //       //     condition: "any",
  //     }
  //   }).then(function (response) {
  //     const jodId = response.data.job_id
  //     var queryJobURL = `https://api.priceapi.com/v2/jobs/${jodId}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
  //     axios({
  //       method: 'Get',
  //       url: queryJobURL,
  //     }).then(function (response) {
  //       setInterval(function () {
  //         if (response.data.status === "finished") {
  //           var queryURL = `https://api.priceapi.com/v2/jobs/${w}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
  //           axios({
  //             method: 'Get',
  //             url: queryURL,
  //           }).then(function (response) {
  //             res.json(response);
  //           })
  //         }
  //       })

  //     })


