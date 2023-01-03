const express = require('express');
const axios = require("axios");
const router = express.Router();

// Backup if key quota is reached
menudata = require('./data/getMenudatav3.json');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }


const sendRequest = async (restID) => {
    try {
        const resp = await getMenus(restID);
        return resp;
    } catch (err) {
        // Handle Error Here
        return err;
    }
}

router.post('/getMenu', async (req, res) => {
    if (req.body.locRestaurants) {
        const resultALL = [];
        const result = await sendRequest(req.body.locRestaurants.id);
        resultALL.push({
            menu: result?.data?.restaurant?.menus[0],
        })

        const newALL = convert(resultALL)
        const resultALL2 = [];
        for (i = 0; i < newALL.length; i++) {
            if (resultALL2.length === 10) {
                break;
            }
            const result = await getNutrition(newALL[i]);
            if (result == null || result === "bad") {
                //nothing
            }
            else {
                result.food.label = newALL[i];
                resultALL2.push(
                    result,
                )
            }
        }
        res.json(resultALL2);

        // Simulated (if key quota is reached)
        // res.json(menudata);
    }

});

function convert(MenuData) {
    var MenuItems;;
    for (i = 0; i < MenuData.length; i++) {
        const restItems = [];
        for (j = 0; j < MenuData[i].menu.sections.length; j++) {
            for (k = 0; k < MenuData[i].menu.sections[j].items.length; k++) {
                restItems.push(MenuData[i].menu.sections[j].items[k].name)
            }
        }
        MenuItems = restItems;
    }
    return MenuItems;
}

async function getMenus(restID) {
    var res;
    const options = {
        method: 'GET',
        url: 'https://the-fork-the-spoon.p.rapidapi.com/restaurants/v2/get-info',
        params: { restaurantId: restID },
        headers: {
            'X-RapidAPI-Key':  process.env.ForkSpoonAPIKey,
            'X-RapidAPI-Host': 'the-fork-the-spoon.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        res = response.data;

    }).catch(function (error) {
        res = error;

    });
    return res;
}

async function getNutrition(MenuItem) {
    var res;
    const options = {
        method: 'GET',
        url: `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.EdamamAppID}&app_key=${process.env.EdamamKey}&ingr=${MenuItem}`,
    };
    await axios.request(options).then(function (response) {
        res = response.data.parsed[0];

    }).catch(function (error) {
        res = 'bad';
    });
    return res;
}



module.exports = router;