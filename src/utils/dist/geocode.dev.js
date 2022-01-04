"use strict";

var request = require('postman-request');

var geocode = function geocode(address, callback) {
  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFpbnRvbnciLCJhIjoiY2tkdGd5bmw2MXl1dTJ6bWh4ZnhxMWY4aiJ9.f0GiPyR41hmMGBVVppYvyA&limit=1';
  var plainUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/NewYork.json?access_token=pk.eyJ1IjoiYmFpbnRvbnciLCJhIjoiY2tkdGd5bmw2MXl1dTJ6bWh4ZnhxMWY4aiJ9.f0GiPyR41hmMGBVVppYvyA&limit=1';

  if (!address) {
    console.log('Search not complete, please provide an address');
  } else {
    request({
      url: url,
      json: true
    }, function (error, response) {
      if (error) {
        callback('Unable to connect to location services!', undefined);
      } else if (response.body.features.length === 0) {
        callback('Location not found, please try another search.', undefined);
      } else {
        var _response$body$featur = response.body.features[0],
            centerArr = _response$body$featur.center,
            place_name = _response$body$featur.place_name;
        console.log('response.body.features: ', response.body.features);
        console.log('centerArr: ', centerArr, 'place_name: ', place_name); // console.log('response.body.features[0].context[2].text: ', response.body.features[0].context[2].text)
        // const general_location = response.body.features[0].context[2].text + ', ' + response.body.features[0].context[3].text

        callback(undefined, {
          latitude: centerArr[1],
          longitude: centerArr[0],
          location: place_name
        });
      }
    });
  }
};

module.exports = geocode;