"use strict";

var path = require('path');

var express = require('express');

var hbs = require('hbs');

var app = express(); //Pull in forecast and geocode modules

var forecast = require('./utils/forecast.js');

var geocode = require('./utils/geocode.js'); //customized name for 'views' directory


var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials'); //Set up handlebars engine and views location

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // serves up assets from public directory

app.use(express["static"](publicDirectoryPath)); // dynamic hbs template

app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather App',
    name: 'Will Bainton'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About Me',
    name: 'William Bainton'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    title: 'Help Page',
    message: 'Feel free to contact the creator with any questions',
    name: 'William Bainton'
  });
}); //Goal: Wire up /weather
//1. Require geocode/forecast into app √
//2. Use address to geocode
//3. Use coordinates to get the forecast
//4. Send back the real forecast and location
//5. Test

app.get('/weather', function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter a valid address'
    });
  } // const location = req.query.location


  geocode(req.query.address, function (error) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (error) {
      return console.log('Error: ', error);
    } else {
      forecast(latitude, longitude, function (error, forecastData) {
        if (error) {
          return console.log('Error: ', error);
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        }); // console.log(location)
        // console.log(forecastData)
        // res.send({
        //     location: location,
        //     weather: forecastData,
        //     address: req.query.address
        // })
      });
    }
  });
}); //Goal: update the weather endpoint to accept a address
//1. No address? Send back an error message √
//2. Address? Send back the static JSON √
//a. Add address property onto JSON which provides the provided address √
//3. Test /weather and /weather?address=philadelphia

app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'Please provide a search term'
    });
  }

  console.log(req.query); //.query property appears as an object { search: 'games', rating: '5' s}s

  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    title: 'Oops!',
    errorMessage: 'I\'m sorry, this help article cannot be found',
    name: 'William Bainton'
  });
}); //wildcard means match anything we haven't matched so far

app.get('*', function (req, res) {
  res.render('404', {
    title: 'Oops!',
    errorMessage: 'I\'m sorry, this page cannot be found',
    name: 'William Bainton'
  });
}); //Goal: Create a 404 html page in hbs
// 1. Set up the template to render the header and footer
// 2. Set up the template to render an error message in a paragraph
// 3. Render the template for both 404 routes

app.listen(3000, function () {
  console.log('Server running on port: 3000');
});