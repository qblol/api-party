const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config');
const googleMapsClient = require('@google/maps').createClient({
  key: config.googleKey
});
const weather = require('npm-openweathermap');
weather.api_key = config.owmKey;
weather.temp = 'c';

// Geocode an address.
router.get('/search', function(req,res) {
  var params = {query: req.query.place}
  var city
  var long
  var lat
  googleMapsClient.places(params, function(err, response) {
    if (!err) {
      // res.send(response.json.results);
      city = response.json.results[0].name
      lat = response.json.results[0].geometry.location.lat
      long = response.json.results[0].geometry.location.lng
      // console.log(city);
      // console.log(latitude);
      // console.log(longitude);
      var location = {
        longitude: long,
        latitude: lat
      }
      console.log(location);
      weather.get_weather_custom('coordinates', location, 'weather').then(function(hasil){
          res.send(hasil);
      })
    }
  })
})

app.use('/', router)
app.listen(3000)
