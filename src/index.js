const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;

import citiesDB from '../data/city.list.json';
import { removeDiacritics } from './removeDiacritics';

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Utilities
const getCitiesByName = (name) => {
  return citiesDB.filter(
    (city) =>
      removeDiacritics(city.name).toUpperCase() ===
      removeDiacritics(name).toUpperCase()
  );
};

const getCityByCountryAndName = (country, name) => {
  return citiesDB.filter(
    (location) =>
      location.country.toUpperCase() === country.toUpperCase() &&
      removeDiacritics(location.name).toUpperCase() ===
        removeDiacritics(name).toUpperCase()
  );
};

const getCityByCountryStateAndName = (country, state, name) => {
  return citiesDB.filter(
    (location) =>
      location.country.toUpperCase() === country.toUpperCase() &&
      location.state.toUpperCase() === state.toUpperCase() &&
      removeDiacritics(location.name).toUpperCase() ===
        removeDiacritics(name).toUpperCase()
  );
};

// GET
app.get('/city/:name', (req, res) => {
  const { name } = req.params;

  res.status(200).send(getCitiesByName(name));
});

app.get('/city/:country/:name', (req, res) => {
  const { name, country } = req.params;

  res.status(200).send(getCityByCountryAndName(country, name)[0]);
});

app.get('/city/:country/:state/:name', (req, res) => {
  const { name, country, state } = req.params;

  res.status(200).send(getCityByCountryStateAndName(country, state, name)[0]);
});

app.listen(PORT, () => console.log(`api is alive on http://localhost:${PORT}`));
