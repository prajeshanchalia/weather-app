const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhamVzaGFuY2hhbGlhIiwiYSI6ImNrNHA3cjBsODBzaXQzbXM3bWVzN29wcHQifQ.O9CLoswGwuzUCBLDkDdaPg&country=US&limit=1';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error) {
            callback('Geocoding Service not available', undefined);
        } else if (body.features.length === 0) {
            callback('Invalid response from geocoding service, possibly due to invalid location', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;