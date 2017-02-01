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
  var params = {address: req.query.place}
  var city
  var lon
  var lat
  googleMapsClient.geocode(params, function(err, response) {
    if (!err) {
      res.send(response.json.results);
      // city = response.json.results[0].address_components[0].short_name
      // weather.get_weather_custom('city', city, 'weather').then(function(hasil){
      //     res.send(hasil);
      // })

    }
  })
})

app.use('/', router)
app.listen(3000)
