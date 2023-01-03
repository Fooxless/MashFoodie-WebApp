const express = require('express');
const axios = require("axios");
const router = express.Router();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
// Backup if key quota reached
testData = require('./data/getRest.json');

router.get('/getRest/:restaurant', (req, res) => {
    // Simulated (if key quota is reached)
    // res.json(testData);

    //Real Use
    const sendRequest = async () => {
        try {
            const resp = await locationList(req.params.restaurant);
            res.json(resp);
            //console.log(resp);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    sendRequest();
});


async function locationList(textIN) {
    const cityID = await getLocation(textIN);
    var res;
    if (cityID === 'error') {
        return "Unknown City"
    }
    const options = {
        method: 'GET',
        url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/list',
        params: { queryPlaceValueCityId: cityID, pageSize: '10', pageNumber: '1' },
        headers: {
            'X-RapidAPI-Key': process.env.ForkSpoonAPIKey,
            'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        res = response.data;
    }).catch(function (error) {
        console.error(error);
    });
    return res;
}

async function getLocation(textIN) {
    const axios = require("axios");
    const data = await auto_complete(textIN);
    var res;
    const options = {
        method: 'GET',
        url: 'https://the-fork-the-spoon.p.rapidapi.com/locations/v2/list',
        params: {
            google_place_id: data[0],
            geo_ref: 'false',
            geo_text: data[1],
            geo_type: 'locality'
        },
        headers: {
            'X-RapidAPI-Key': process.env.ForkSpoonAPIKey,
            'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        if (response.data.id_city) {
            res = response.data.id_city;
        }
        else {
            res = 'error';
        }

    }).catch(function (error) {
        res = error;
    });

    return res;
}


async function auto_complete(textIN) {
    var res;
    const options = {
        method: 'GET',
        url: 'https://the-fork-the-spoon.p.rapidapi.com/locations/v2/auto-complete',
        params: { text: textIN },
        headers: {
            'X-RapidAPI-Key': process.env.ForkSpoonAPIKey,
            'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        res = [response.data.data.geolocation[0].id.id, response.data.data.geolocation[0].name.text];
    }).catch(function (error) {
       res = error;
    });
    return res;
}


module.exports = router;