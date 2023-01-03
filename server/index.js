require('dotenv').config();
const path = require('path');
const express = require('express');
const DistanceRouter = require('./routes/getDistance.js');
const RestaurantsRouter = require('./routes/getRest.js');
const MenuRouter = require('./routes/getMenu.js');
const CounterRouter = require('./routes/getCounter.js');
const app = express();
const port = 3001;

// Serve out any static assets correctly
app.use(express.static('../client/build'));
app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: false }));
// What's your favorite animal?
app.get('/api/question', (req, res) => {
  res.json({ answer: 'Llama' })
})


// New api routes should be added here.
// It's important for them to be before the `app.use()` call below as that will match all routes.
app.use('/api', RestaurantsRouter);

app.use('/api', DistanceRouter);

app.use('/api', MenuRouter);

app.use('/api', CounterRouter);

// Any routes that don't match on our static assets or api should be sent to the React Application
// This allows for the use of things like React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})
