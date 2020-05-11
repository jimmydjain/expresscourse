const request = require('postman-Request')
const chalk = require('chalk')


const geocode = ( address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamltbXlkamFpbiIsImEiOiJjazl1OHBiOWMwMmZhM21xcGp3am10cmN6In0.Gi0rR3kosTIOhbFDCDeaOw&limit=1'

    //console.log(url)
    // request({url: url ,json: true } , (error, response) => {
        request({url ,json: true } , (error, {body}) => { // destructuring the object

        if (error)
        {
            callback('cannot connect to GeoLOcation API', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else 
        {
            console.log(url)
           // console.log(response.body)
           // console.log('************' + response.body.features[0].center[0])
            //callback(undefined,response)
            callback(undefined ,{lattitude :body.features[0].center[0] , longitude :body.features[0].center[1] , place_name: body.features[0].place_name})
        }
     })

}

// geocode('12what' , (error , data)=> {

//     if(error) {
//         console.log('cannot connect to GeoLocation API')
//     }
//     else if (data.body.features.length ===0)
//     {
//         console.log('Cannot find location')
//     }
//     else
//     {
        
//         console.log('Lattitude' + data.body.features[0].center[0])
//         console.log('Longitude' + data.body.features[0].center[0])
//         console.log('PlaceName' +data.body.features[0].place_name)
//     }
  
// })

module.exports = {
    geocode
   // geocode : geocode
}