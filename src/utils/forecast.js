const request = require('request');

const forecast = (latitude, longitude, place_name, callback) => {
    const url = 'https://api.darksky.net/forecast/2a6138d3db36505898084500d7eb5ef8/' + latitude + ',' + longitude + '?units=si';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Weather Service not available', undefined);
        } else if (body.error) {
            callback('Invalid response from weather service, possibly due to invalid request parameters', undefined);
        } else {
            callback(undefined, 'Forecast for ' + place_name + ' ' + body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain')
        }

    });
};

module.exports = forecast;