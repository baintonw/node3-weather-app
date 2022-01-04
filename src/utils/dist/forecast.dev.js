"use strict";

var request = require('postman-request'); //request(options, callback)


var forecast = function forecast(latitude, longitude, callback) {
  // const newYork = 'http://api.weatherstack.com/current?access_key=04aed915764ab4753354a0ce6fad7176&query=New York&units=f'
  // s
  var url = 'http://api.weatherstack.com/current?access_key=04aed915764ab4753354a0ce6fad7176&query=' + latitude + ',' + longitude + '&units=f';
  request({
    url: url,
    json: true
  }, function (error, response) {
    console.log('Url: ', url);

    if (error) {
      callback(error, undefined);
    } else if (response.body.error) {
      callback('Please enter a valid address and try again', undefined);
    } else {
      var data = response.body;
      var _data$current = data.current,
          temperature = _data$current.temperature,
          feelslike = _data$current.feelslike,
          weather_descriptions = _data$current.weather_descriptions;
      var _data$location = data.location,
          name = _data$location.name,
          region = _data$location.region;
      var forecastString = "Currently in ".concat(name, ", ").concat(region, ":\n").concat(weather_descriptions[0], "\nIt is currently ").concat(temperature, " degrees out. It feels like it is ").concat(feelslike, " degrees out.");
      callback(undefined, forecastString);
    }
  });
};

module.exports = forecast;