const request = require('request')

//Weather or forecast api Darksky.net
const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/685dce9cbed2a11aa57a828b1445d36d/' + lat + ',' + long + '?units=si'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather services!',undefined);
        } else if (body.error) {
            callback('Unable to find location!',undefined);
        } else {
            const temperatureHigh = body.daily.data[0].temperatureHigh;
            const temperatureLow = body.daily.data[0].temperatureLow;
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability
            const summary = body.daily.data[0].summary
            callback(undefined,`${summary} It is currently ${temperature} degree out. This high today is ${temperatureHigh} with a low of ${temperatureLow}. There is a ${precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast