/* ********************* npm modules *********************************************************** */
/* ********************* TODO: Apply MVC *********************************************************** */

var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
var compression = require('compression')

/* ********************* custom imports ******************************************************** */
const con = require('./db-connection.js')

/* ********** Secret information imports from .env through config.js file ********************** */
const { PORT } = require('./config'); // PORT is being set to port 80; we are able to use port 80 with help of cors [as in certain environments inter-cors connections are not permitted by default]

/* initializing expressJS */
const app = express();

/* Express compression middleware */
app.use(compression()) // by default compress all responses

/* parser especially for JSON as most of the exchange is of JSON type */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Enabling cors */
app.use(cors())

const port = PORT;

/* Global declarations  */

/* Response nature informer */
// const messageNoAuth = "You are not authorized to use the API. Contact Admin to resolve the issue";
// const statusNoAuth = 405;  :::You are not authorized to use the API. Contact Admin to resolve the issue:::

const statusSuccess = 200; //  API successfully returns requested data in the result array.
const statusError = 403; //  Something wrong with request inputs


/* API LIST: Names of the all APIs used in carbon print */

const team = "/team" // fetch list of team with designations
const food_1 = "/food/1" // list of food items with respective carbon footprints
const food_supply = "/food-supply"
const eat_veg = "/eat-veg-carbon-footprints" // List of diet types with respective carbon footprints
const eat_local = "/eat-local-carbon-footprints" // Carbon footprints of food supply chain resources
const carbon_historical_data = "/carbon-historical-data" // Global average temperature increase from year 1850 to 2018
const flights_carbon_footprint = "/flights-carbon-footprint" // List of flight class types with carbon footprint
const temperature_historical_data = "/temperature-historical-data" // Carbon footprint from year 1850 to 2018
const world_flight_carbon_footprints = "/world-flight-carbon-footprints" // Top 10 countries emitting highest carbon footprint

/* Global functions */
/* password check is required for CREATE, UPDATE, and DELETE queries, but as of now our platform is not using such queries */
// const matchPassword = (pass) => {
//   if (pass === password) {
//     return true
//   } else {
//     return false
//   }
// }

/* *********************************************************************************************** */
/**********************************  QUERIES  ******************************************************/
/* *********************************************************************************************** */

/* **************** Fetch Team Information ********************* */
app.get(team, (req, res) => {

  const jsonMessage = []
  con.query("SELECT t.*, d.designation_type FROM tb_team_members as t INNER JOIN tb_designation_type as d ON t.designation_type_id = d.designation_type_id", function (err, result) {
    if (err) {
      // keeping in separate push, so that on client side we can know the nature of response before rendering any data [is to check whether API return data successfully or not; this pattern is followed in every API]
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here

});


/* **************** Fetch Food Carbon-Footprints 1 ********************* */
app.get(food_1, (req, res) => {

  const jsonMessage = []
  con.query("SELECT t.*, d.food_type FROM tb_food_list as t INNER JOIN tb_food_type as d ON t.food_type_id = d.food_type_id", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here

});

/* **************** Fetch Data of Annual Average carbon footprint in accordance to diet ********************* */
app.get(eat_veg, (req, res) => {

  const jsonMessage = []
  con.query("SELECT * FROM tb_eat_veg", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here
});

/* **************** Fetch Data of Annual Average carbon footprint in accordance to diet ********************* */
app.get(eat_local, (req, res) => {
  const jsonMessage = []
  con.query("SELECT * FROM tb_eat_local", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here
});

/* **************** Fetch Historical Data of carbon emissions ********************* */
app.get(carbon_historical_data, (req, res) => {
  const jsonMessage = []
  con.query("SELECT * FROM tb_carbon_footprint_historical_data WHERE YEAR >= 1850", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here
});

/* **************** Fetch Historical Data of temperatures ********************* */
app.get(temperature_historical_data, (req, res) => {
  const jsonMessage = []
  con.query("SELECT * FROM tb_historical_temperature WHERE YEAR >= 1850", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here
});

/* **************** Fetch Historical Data of carbon emissions ********************* */
app.get(flights_carbon_footprint, (req, res) => {
  const jsonMessage = []
  con.query("SELECT * FROM tb_flight_carbon_footprint", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here
});

/* **************** Fetch Historical Data of carbon emissions ********************* */
app.get(world_flight_carbon_footprints, (req, res) => {
  const jsonMessage = []
  con.query("SELECT * FROM tb_flights_world_averages ORDER BY people ASC", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here
});



/* **************** Fetch Food Supply chain Carbon footprint ********************* */
app.get(food_supply, (req, res) => {

  const jsonMessage = []
  con.query("SELECT * FROM cc_food_supply_chain", function (err, result) {
    if (err) {
      jsonMessage.push({
        status: statusError
      })
      jsonMessage.push({
        result: err
      })
      res.send(jsonMessage)
      throw err;
    }
    else {
      jsonMessage.push({
        status: statusSuccess
      })
      jsonMessage.push({
        result: result
      })
      res.send(jsonMessage);
    }
  }); // con ends here

});

// listening the port
app.listen(port, () => console.log(`Listening on port ${port}`));
