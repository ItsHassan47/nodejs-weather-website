const request = require('postman-request'); // to retrive data from api

const wheatherStack = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3d15d443ffe8e56220c27bf5369c4e17&query=${longitude},${latitude}`;

    // json arg will automatically parse the response
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to wheather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current;
            callback(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees outside. It feels like ${data.feelslike}. There is ${data.precip}% chance of rain.`);
        }
    });
}

module.exports = wheatherStack;