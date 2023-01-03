const express = require('express');
const axios = require("axios");
const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }


const sendRequest = async (placeid1, placeid2) => {
    try {
        const resp = await getroute(placeid1, placeid2);
        return resp;
    } catch (err) {
        return err;
    }
}

router.post('/getDistance', async (req, res) => {
    if (req.body.locRestaurants.data) {
        const resultALL = [];
        for (i = 0; i < req.body.locRestaurants.data.length; i++) {
            const result = await sendRequest(req.body.mylocation, `${req.body.locRestaurants.data[i].geo.latitude}, ${req.body.locRestaurants.data[i].geo.longitude}`);
            resultALL.push({
                duration: result.routes[0].legs[0].duration.text,
                distance: result.routes[0].legs[0].distance.text
            })
        }
        res.json(resultALL);

    }

});

async function getroute(placeA, placeB) {
    var res;
    const IDplaceA = await getLocationID(placeA);
    const options = {
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${IDplaceA}&destination=${placeB}&key=${process.env.googleAPIKey}`,
    };

    await axios.request(options).then(function (response) {
        res = response.data;
    }).catch(function (error) {
        res = error;
    });
    return res;
}

async function getLocationID(placeA) {
    var res;
    const options = {
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${placeA}&key=${process.env.googleAPIKey}`,
    };

    await axios.request(options).then(function (response) {
        res = response.data;
    }).catch(function (error) {
        res = error;
    });
    return res.results[0].place_id;
}


module.exports = router;