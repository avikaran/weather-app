const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXZpa2FyYW4iLCJhIjoiY2s2NnMxNGoyMDFqNjNmcXh0a29ka216cyJ9.UxUzy7x4N_TfgP_UTvX-ew&limit=1'
    request( {url:url, json:true}, (error,response) => {
        if(error){
            callback('Unable to connect to the geocode services', undefined)
        }else if( response.body.features.length == 0){
            callback('Unable to find location. Try another search', undefined)
        }else{
            const result = {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            }
            callback(undefined,result)
        }
    })
}

module.exports = geocode
