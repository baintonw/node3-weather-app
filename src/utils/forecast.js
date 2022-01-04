const request = require('postman-request')

//request(options, callback)
const forecast = (latitude, longitude, callback) => {
    // const newYork = 'http://api.weatherstack.com/current?access_key=04aed915764ab4753354a0ce6fad7176&query=New York&units=f'
    // s
    const url = 'http://api.weatherstack.com/current?access_key=04aed915764ab4753354a0ce6fad7176&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, response) => {
        console.log('Url: ', url)
        if(error) {
            callback(error, undefined)
        } else if(response.body.error) {
            callback('Please enter a valid address and try again', undefined)
        } else {
            const data = response.body
                    const { temperature, feelslike, weather_descriptions }  = data.current
                    const { name, region } = data.location
                    const forecastString = `Currently in ${name}, ${region}:\n${weather_descriptions[0]}\nIt is currently ${temperature} degrees out. It feels like it is ${feelslike} degrees out.`
            callback(undefined, forecastString)
        }
    })
}
module.exports = forecast