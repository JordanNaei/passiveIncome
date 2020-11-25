var axios = require('axios');
var db = require('../models');
var math = require('mathjs');


module.exports = function (app) {

    app.get("/", async function (req, res) {

        var getResult = await db.iPhones.findAll({});
        for (let i = 0; i < getResult.length; i++) {
            getResult[i].capacity = getResult[i].capacity.split(",");
        }
        var phones = { list: getResult };
        res.render("index", phones);
    })

    app.post("/api/jobs/:id", async function (req, res) {
        var result = await db.iPhones.findOne({
            where: {
                id: req.params.id
            }
        })
        try {
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
                }
            })

            var joId1 = result1.data.job_id;
            var joId2 = result2.data.job_id;
            console.log(joId1, joId2);
        } catch (err) {
            var badRes = {
                message: "Unexpected error occured try again later!"
            }
            res.render("errorLandingP", badRes);
        }
        var queryJobURL1 = `https://api.priceapi.com/v2/jobs/${joId1}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
        var queryJobURL2 = `https://api.priceapi.com/v2/jobs/${joId2}?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;

        var statusTimer = setInterval(async () => {
            var gRes1 = await axios({
                method: 'get',
                url: queryJobURL1,
            })
            var gRes2 = await axios({
                method: 'get',
                url: queryJobURL2,
            })

            if (gRes1.data.status === 'finished' && gRes2.data.status === 'finished') {
                clearInterval(statusTimer);
                var queryURL1 = `https://api.priceapi.com/v2/jobs/${gRes1.data.job_id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;
                var queryURL2 = `https://api.priceapi.com/v2/jobs/${gRes2.data.job_id}/download?token=BALXHCDIAFPYBVAAJKFYSCJNRFHOWKAUAACFFGTOAECIAHAKNOZNBXZIESJGZLPJ`;

                try {
                    var fRes1 = await axios({
                        method: 'get',
                        url: queryURL1,
                    })

                    var fRes2 = await axios({
                        method: 'get',
                        url: queryURL2,
                    })
                } catch (err) {
                    var badRes = {
                        message: "Unexpected error occured try again later!"
                    }
                    res.render("errorLandingP", badRes);
                }
                try {
                    var eBayOffers = fRes1.data.results[0].content.offers;
                    var amazonOffers = fRes2.data.results[0].content.offers;
                    // The math section for Ebay 
                    var eNumOfDeals = eBayOffers.length;
                    var ePrices = [];
                    var eshipCost = [];
                    for (i = 0; i < eNumOfDeals; i++) {
                        if (eBayOffers[i].price) {
                            ePrices.push(eBayOffers[i].price)
                        }
                    }
                    for (i = 0; i < eNumOfDeals; i++) { eshipCost.push(eBayOffers[i].shipping_costs) };
                    var avrPrice = math.mean(ePrices).toFixed(2);
                    ePrices.sort((a, b) => a - b);
                    var highesP = ePrices[ePrices.length - 4];
                    var lowestP = ePrices[0];
                    eshipCost.sort((a, b) => a - b);
                    var hShipCost = eshipCost[eshipCost.length - 1];
                    console.log(hShipCost);
                    var eBayObj = {
                        nOf: eNumOfDeals,
                        hPrice: highesP,
                        lPrice: lowestP,
                        sCosr: hShipCost,
                        avrP: avrPrice
                    }
                    // The math section for Amamzon 
                    var aNumOfDeals = amazonOffers.length;
                    var aPrices = [];
                    var ashipCost = [];
                    for (i = 0; i < aNumOfDeals; i++) {
                        if (amazonOffers[i].price) {
                            aPrices.push(amazonOffers[i].price)
                        }
                    }
                    for (i = 0; i < aNumOfDeals; i++) { ashipCost.push(amazonOffers[i].shipping_costs) };
                    var aArPrice = math.mean(aPrices).toFixed(2);
                    aPrices.sort((a, b) => a - b);
                    var ahighesP = aPrices[aPrices.length - 1];
                    var alowestP = aPrices[0];
                    ashipCost.sort((a, b) => a - b);
                    var ahShipCost = ashipCost[ashipCost.length - 1];

                    var amazonObj = {
                        nOf: aNumOfDeals,
                        hPrice: ahighesP,
                        lPrice: alowestP,
                        sCosr: ahShipCost,
                        avrP: aArPrice
                    }
                } catch (err) {
                    var badRes = {
                        message: "Unexpected error occured try again later!"
                    }
                    res.render("errorLandingP", badRes);
                }
                // This is the result middle section
                var abMaxDeal = ahighesP - lowestP;
                var baMaxDeal = highesP - alowestP;
                var theDeal = Math.max(abMaxDeal, baMaxDeal);
                var shC = parseInt(ahShipCost) + parseInt(hShipCost);
                var netInc = theDeal - shC;
                var resObj = {
                    rev: theDeal,
                    sC: shC,
                    nIn: netInc
                }
                res.render("resultPage", {
                    eb: eBayObj,
                    am: amazonObj,
                    f: resObj
                });
            };
        }, 2000);
    })
    // mod exp curly bracket
}