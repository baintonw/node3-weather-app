"use strict";

console.log('Client side javascript file has loaded');
fetch('http://puzzle.mead.io/puzzle').then(function (response) {
  response.json().then(function (data) {
    console.log(data);
  });
});
var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var location = search.value;
  messageOne.textContent = 'Loading...';
  fetch("http://localhost:3000/weather?address=".concat(location)).then(function (response) {
    response.json().then(function (data) {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        console.log(data.forecast);
        console.log(data.location);
        messageOne.textContent = '';
        messageTwo.textContent = 'Location: ' + data.location + '\n' + 'Forecast: ' + data.forecast;
      }
    });
  });
  console.log(location);
}); //Goal: Fetch weather from the back end!
//1. Set up a call in fetch to fetch weather for Boston √
//2. Get the parsed JSON response √
//If there's an error, print the error
//If there's no error print the location and the forecast
//Refresh the browser and test your work