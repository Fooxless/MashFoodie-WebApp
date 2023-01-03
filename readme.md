[Back to Portfolio](https://github.com/Fooxless/Portfolio-Connor-Gryphon)

# MashFoodie Web App [2022]
This web application is a API Mashup of different APIs and uses an AWS bucket to store a visit counter of the web page. The purpose of the mashup is to allow someone to view restaurants around them, get directions to a selected restaurant and view the nutritional information of the menu for the said restaurant. Restaurants will appear in a list with their current distance and duration to get to each restaurant. After clicking on a restaurant, a route to the restaurant will appear on the map. Whilst a restaurant is selected, a user can click the ‘Menu’ button to receive a detailed descriptions of the nutritional information from some of the menu items used by the restaurant.
 
Mashup 1
- [The Fork the Spoon](https://rapidapi.com/apidojo/api/the-fork-the-spoon/) to find restaurants around a given area
- [Google Directions API](https://developers.google.com/maps/documentation/directions) to find the distance and duration between each restaurant and your location.

Mashup 2
- [The Fork the Spoon](https://rapidapi.com/apidojo/api/the-fork-the-spoon/) to find restaurants around a given area
- [Edamam](https://developer.edamam.com/food-database-api-docs) to find nutrient information of items on the menu for each restaurant.

![map to](https://user-images.githubusercontent.com/102510556/209743847-408d09f3-3515-4291-b78d-7fbe8b7e74c5.PNG)

![table](https://user-images.githubusercontent.com/102510556/209743932-a1449ffa-3329-4ba8-b5d0-83e161d62804.PNG)

### Getting Started
This application requires various api keys such as:
 - Edama API key
 - AWS credentials 
 - The Fork the Spoon API Key
 - Google API Key
 
Build your client application first
``` 
cd client
npm run build
```

Start the server
```
cd ../server
node index.js
```

Open your browser and navigate to localhost:3000

*This project was a university assignment.*
