const axios = require("axios");
const db = require('./models');
var CircularJSON = require('circular-json');


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
      axios.all([
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
        }),
        axios({
          method: 'post',
          url: queryURL,
          data: {
            source: "amazon",
            country: "us",
            topic: "product_and_offers",
            key: "asin",
            values: asin_N,
            // max_age: 43200,
            //     max_pages: 50,
            //     condition: "any",
          }
        })
      ]).then(axios.spread((data1, data2) => {
        var joId1 = data1.data.job_id;
        var joId2 = data2.data.job_id;
        console.log(joId1, joId2);
        var queryJobURL1 = `https://api.priceapi.com/v2/jobs/${joId1}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        var queryJobURL2 = `https://api.priceapi.com/v2/jobs/${joId2}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        axios.all([
          axios({
            method: 'get',
            url: queryJobURL1,
          }),
          axios({
            method: 'get',
            url: queryJobURL2,
          }),
        ]).then(axios.spread((data1, data2) => {
          console.log(data1.data.status, data2.data.status);
          var queryURL1 = `https://api.priceapi.com/v2/jobs/${data1.data.job_id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
          var queryURL2 = `https://api.priceapi.com/v2/jobs/${data2.data.job_id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
          if (data1.data.status === 'finished' && data2.data.status === 'finished') {
            console.log("Jobs are ready for download");
            axios.all([
              axios({
                method: 'get',
                url: queryURL1,
              }),
              axios({
                method: 'get',
                url: queryURL2,
              }),
            ]).then(axios.spread((data1, data2) => {
              // console.log(data1, data2);
              console.log(typeof data1);
        const gg =   CircularJSON.stringify(data1.data);
        res.json(gg)
              // const hob = cleanStringify(data1.data)
              // this is the get for the job status
            }))
            // This is the if statement closing tag
          } else {
            console.log("still waiting");
          }
          // this is the get for the job status
        }))
      }))
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

  function cleanStringify(object) {
    if (object && typeof object === 'object') {
        object = copyWithoutCircularReferences([object], object);
    }
    return JSON.stringify(object);

    function copyWithoutCircularReferences(references, object) {
        var cleanObject = {};
        Object.keys(object).forEach(function(key) {
            var value = object[key];
            if (value && typeof value === 'object') {
                if (references.indexOf(value) < 0) {
                    references.push(value);
                    cleanObject[key] = copyWithoutCircularReferences(references, value);
                    references.pop();
                } else {
                    cleanObject[key] = '###_Circular_###';
                }
            } else if (typeof value !== 'function') {
                cleanObject[key] = value;
            }
        });
        return cleanObject;
    }
}



  // mod exp curly bracket
}