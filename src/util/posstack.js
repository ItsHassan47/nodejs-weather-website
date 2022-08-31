const request = require('postman-request');

const posStack = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=0c6471336d63584b1f465d1d93dd2a96&query=${encodeURIComponent(address)}`

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to wheather service.', undefined);
        } else if (body.data.length === 0) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                longitude: body.data[0].longitude,
                latitude: body.data[0].latitude,
                location: body.data[0].label
            });
        }
    });
}

module.exports = posStack;
