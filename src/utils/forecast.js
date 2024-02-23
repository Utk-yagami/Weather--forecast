const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=2d8fd6081c8008086dfdbcdf2cf880bc'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather servies")
        }
        else if (body.cod !== 200) {
            callback("Unable to find location")
        }
        else {

            const data = {
                forecast: body.weather[0].main,
                temperature: body.main.temp,
                location: body.name
            }
            callback(undefined, data)
        }
    })
}
module.exports = forecast