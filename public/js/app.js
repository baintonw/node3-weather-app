console.log('Client side javascript file has loaded')

fetch('http://puzzle.mead.io/puzzle')
    .then((response) => {
        response.json()
            .then((data) => {
                console.log(data)
            })
    })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if(data.error) {
                        console.log(data.error)
                    } else {
                        console.log(data)
                        console.log(data.forecast)
                        console.log(data.location)
                        messageOne.textContent = ''
                        messageTwo.textContent = 'Location: ' + data.location + '\n' + 'Forecast: ' + data.forecast
                    }
        })
})
    console.log(location)
})
    
    


//Goal: Fetch weather from the back end!

//1. Set up a call in fetch to fetch weather for Boston √
//2. Get the parsed JSON response √
    //If there's an error, print the error
    //If there's no error print the location and the forecast
//Refresh the browser and test your work