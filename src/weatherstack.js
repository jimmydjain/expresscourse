const request = require('postman-request')
const chalk = require('chalk')




const weatherstack = (lattitude , longitude , callback) =>
{
    const url =  'http://api.weatherstack.com/current?access_key=ac502ced51920e9bd8e6d6dd9dc25d25&query='+lattitude+',' +longitude+'&units=f'
    request({url, json:true} , (error, response)=> {

        if(error)
        {
            callback('cannot connect it to weatherstack')
        }
        else
        (
            callback(undefined , { temperature :response.body.current.temperature , precip : response.body.current.precip})
        )


    } )

}


// weatherstack (36.174465,-86.767960, (error, response)=> {

//     if(error)
//     { 
//         console.log('ERROR RESPONSE')
//     }
//     else
//     {
//         console.log('Current Temperature is ' + chalk.green(response.body.current.temperature) + '  There is a ' + response.body.current.precip + '% chance of rain')

//     }

// })

module.exports = {
    //weatherstack : weatherstack
    weatherstack // destructuring object 
}