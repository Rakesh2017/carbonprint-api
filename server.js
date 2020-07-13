/* npm modules */
var cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
var compression = require('compression')
/* custom imports */
const con = require('./db-connection.js')

/* initializing expressJS */
const app = express();
app.use(compression()) // by default compress all responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const port = process.env.PORT || 80;

/* Global declarations  */
const messageNoAuth = "You are not authorized to use the API. Contact Admin to resolve the issue";
const statusNoAuth = 405;
const jsonNoAuth = []
jsonNoAuth.push({
  status: statusNoAuth,
  result: messageNoAuth
})

const statusSuccess = 200;
const statusError = 403;


/* API LIST */

const team = "/team"
const food_1 = "/food/1"
const food_supply = "/food-supply"
const eat_veg = "/eat-veg-carbon-footprints"
const eat_local = "/eat-local-carbon-footprints"
const carbon_historical_data = "/carbon-historical-data"
const flights_carbon_footprint = "/flights-carbon-footprint"
const temperature_historical_data = "/temperature-historical-data"
const world_flight_carbon_footprints = "/world-flight-carbon-footprints"

/* Global functions */
const matchPassword = (pass) => {
  if (pass === password) {
    return true
  } else {
    return false
  }
}

/************************  APIs  ********************************/

/* **************** Fetch Team Information ********************* */
app.get(team, (req, res) => {

  const jsonMessage = []
  con.query("SELECT t.*, d.designation_type FROM tb_team_members as t INNER JOIN tb_designation_type   as d ON t.designation_type_id = d.designation_type_id", function (err, result) {
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

app.listen(80, () => console.log(`Listening on port ${port}`));
