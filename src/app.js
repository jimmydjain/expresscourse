const express = require('express')
const path = require('path')
const hbs = require('hbs')

const request = require('postman-Request')
const geocode = require('./geocode')
const weatherstack = require('./weatherstack')

// Define paths for express configs

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



// root 
app.get('' , (req, res) =>{

    res.render('index' , {
        title : 'weather app',
        name : 'JIMMY'
    })

})

app.get('/help' , (req, res) =>{

    res.render('help' , {
        title : 'helpTitle',
        helpmessage : 'THIS IS THE DYNAMIC HELP MESSAGE',
        name : 'JIMMY'
    })

})

app.get('/about' , (req, res) =>{

    res.render('about', {
        title : 'About Me Title' ,
        name : 'JIMMY'
    })

})
// const user = 
//     [
//         {name : 'jimmy',   age : 33 },
//         {name : 'Mousam', age :30},
//     ]



// app.get('' , (req , resp)=>{
//     console.log('Request is ' +req.url)
//    // resp.send(JSON.stringify(user))
//    resp.send('<h1> Header </h1>')
//   // resp.send('.)
// })



app.get('/weatherInfo' , (req , resp)=>{

    if(!req.query.address)
    {
      return  resp.send({
            error: 'Please provide a valid address'
        })
    }

    console.log('Provided Address is ' +req.query.address)
    geocode.geocode(req.query.address , (error , {lattitude,longitude,place_name} = {})=>{
        if(error) {
            //return console.log('cannot connect to GeoLocation API')
            return resp.send('cannot connect to GeoLocation API')
        }
        else{
            weatherstack.weatherstack(lattitude , longitude , (temperature , precip)=>{
                return resp.send({
                    lattitude : lattitude,
                    longitude : longitude,
                    place_name : place_name,
                    temperature : temperature,
                    precip : precip
                })
            })

          
        }

    })
    // resp.send({
    //     objct : 'Returning Dummy Object for '+req.query.address
    // });

})



app.get('/help/*' , (req, res)=>{
    res.render('helpError', {
        ErrorMessage : 'Help Error Page',
        title : 'Error Title',
        name : 'jimmy jain'
    })

})

app.get('*' , (req, res)=>{
    res.render('error', {
        ErrorMessage : 'LAST RESORT Help Error Page',
        title : 'Error Title',
        name : 'jimmy jain'
    })

})


app.listen(3000 , ()=>{
    console.log('server is up on port 3000')
})