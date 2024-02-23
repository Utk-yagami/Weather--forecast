const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(address) + '&limit=1&appid=2d8fd6081c8008086dfdbcdf2cf880bc'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to fetch the latitude and longitude')
        }
        else if (body.cod || body.length === 0) {
            callback('Geocode not found')
        }
        else {
            const data = {
                latitude: body[0].lat,
                longitude: body[0].lon
            }
            callback(undefined, data)
        }
    })
}


module.exports = geocode