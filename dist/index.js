"use strict";

var _cityList = _interopRequireDefault(require("../data/city.list.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var app = express();
var PORT = process.env.PORT || 3004;
app.use(express.json()); // Add Access Control Allow Origin headers

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // Utilities

var getCitiesByName = function getCitiesByName(name) {
  return _cityList["default"].filter(function (city) {
    return city.name.toUpperCase() === name.toUpperCase();
  });
};

var getCityByCountryAndName = function getCityByCountryAndName(country, name) {
  return _cityList["default"].filter(function (location) {
    return location.country.toUpperCase() === country.toUpperCase() && location.name.toUpperCase() === name.toUpperCase();
  });
};

var getCityByCountryStateAndName = function getCityByCountryStateAndName(country, state, name) {
  return _cityList["default"].filter(function (location) {
    return location.country.toUpperCase() === country.toUpperCase() && location.state.toUpperCase() === state.toUpperCase() && location.name.toUpperCase() === name.toUpperCase();
  });
}; // GET


app.get('/city/:name', function (req, res) {
  var name = req.params.name;
  res.status(200).send(getCitiesByName(name));
});
app.get('/city/:country/:name', function (req, res) {
  var _req$params = req.params,
      name = _req$params.name,
      country = _req$params.country;
  res.status(200).send(getCityByCountryAndName(country, name)[0]);
});
app.get('/city/:country/:state/:name', function (req, res) {
  var _req$params2 = req.params,
      name = _req$params2.name,
      country = _req$params2.country,
      state = _req$params2.state;
  res.status(200).send(getCityByCountryStateAndName(country, state, name)[0]);
});
app.listen(PORT, function () {
  return console.log("api is alive on http://localhost:".concat(PORT));
});