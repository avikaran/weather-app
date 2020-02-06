const request = require('request')

const forecast = (latitude, longitude, callback)  => {

    const url = 'https://api.darksky.net/forecast/53f47635995ee43a3ad9f180bc07f71f/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            const temp = response.body.currently.temperature
            const chanceeOfRain = response.body.currently.precipProbability
            const result = response.body.daily.data[0].summary + ' It is currently ' + temp + ' degrees out. The high today is ' + response.body.daily.data[0].temperatureHigh + ' with a low of ' + response.body.daily.data[0].temperatureLow + '. There is a  ' + chanceeOfRain + '% chance of rain.'
            callback(undefined, result)
        }
    })

}

module.exports = forecast