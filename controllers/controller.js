const axios = require("axios");
const db = require('../models');
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

    app.post("/api/jobs/:id", async function (req, res) {
        var result = await db.iPhones.findOne({
            where: {
                id: req.params.id
            }
        })
        var asin_N = result.dataValues.asin_n;
        var upc_N = result.dataValues.upc_n;
        var queryURL = "https://api.priceapi.com/v2/jobs?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ";

        var result1 = await axios({
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
        })
        var result2 = await axios({
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
        var joId1 = result1.data.job_id;
        var joId2 = result2.data.job_id;
        console.log(joId1, joId2);
        var queryJobURL1 = `https://api.priceapi.com/v2/jobs/${joId1}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        var queryJobURL2 = `https://api.priceapi.com/v2/jobs/${joId2}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        var gRes1 = await axios({
            method: 'get',
            url: queryJobURL1,
        })
        var gRes2 = await axios({
            method: 'get',
            url: queryJobURL2,
        })

        console.log(gRes1.data.status, gRes2.data.status);

        var queryURL1 = `https://api.priceapi.com/v2/jobs/${gRes1.data.job_id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        var queryURL2 = `https://api.priceapi.com/v2/jobs/${gRes2.data.job_id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;

        var fRes1 = await axios({
            method: 'get',
            url: queryURL1,
        })

        var fRes2 = await axios({
            method: 'get',
            url: queryURL2,
        })
        res.json(fRes1.data, fRes2.data)


        // this is the get for the job status
        // this is the asin and upc end bracket
        // app.post closing tag
    })

    // treating the json circular issue funtion to be based down with the res.json
    // const replacerFunc = () => {
    //     const visited = new WeakSet();
    //     return (key, value) => {
    //         if (typeof value === "object" && value !== null) {
    //             if (visited.has(value)) {
    //                 return;
    //             }
    //             visited.add(value);
    //         }
    //         return value;
    //     };
    // };

    // function cleanStringify(object) {
    //     if (object && typeof object === 'object') {
    //         object = copyWithoutCircularReferences([object], object);
    //     }
    //     return JSON.stringify(object);

    //     function copyWithoutCircularReferences(references, object) {
    //         var cleanObject = {};
    //         Object.keys(object).forEach(function (key) {
    //             var value = object[key];
    //             if (value && typeof value === 'object') {
    //                 if (references.indexOf(value) < 0) {
    //                     references.push(value);
    //                     cleanObject[key] = copyWithoutCircularReferences(references, value);
    //                     references.pop();
    //                 } else {
    //                     cleanObject[key] = '###_Circular_###';
    //                 }
    //             } else if (typeof value !== 'function') {
    //                 cleanObject[key] = value;
    //             }
    //         });
    //         return cleanObject;
    //     }
    // }



    // mod exp curly bracket
}