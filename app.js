const express = require('express');
const app = express();
const router = express.Router();
const config = require('./config');
const googleMapsClient = require('@google/maps').createClient({
  key: config.googleKey
});

// Geocode an address.
router.get('/search', function(req,res) {
  var params = {address: req.query.place}
  googleMapsClient.geocode(params, function(err, response) {
    if (!err) {
      res.send(response.json.results);
    }
  });
})

app.use('/', router)
app.listen(3000)
