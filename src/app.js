const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app = express()

const port = process.env.PORT || 3010

//Defining paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handle bars engine and views location
app.set('view engine' ,'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))



// app.get('', (req,res) => {
//     console.log(req)
//     res.send("Hello Express")
// })
// app.get('/help', (req,res) => {
//     console.log(req)
//     res.send("Help Page")
// })

// app.get('/about', (req,res) => {
//     console.log(req)
//     res.send('<h1>About Page</h1>')
// })


app.get('', (req,res) =>{
    res.render('index', {
        title:'Weather App',
        name: 'Avikaran'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title:'About Weather App',
        name: 'Avikaran'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title:'Help',
        name: 'Avikaran',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({error:"You need to provide the address" })
        
    }
    const address = req.query.address

    geocode(address, (error, data) => {
    
        console.log('Data', data)
        const {location,latitude,longitude} = data || {}
        if(error){
            return res.send({error:error})
        }else{
            forecast(latitude, longitude, (error,result)=>{
                if(error){
                    return res.send({error:error})
                }
                res.send({
                    forecast:result,
                    location: location,
                    address
                })
            })
        }
    })

    // const weatherData = {
    //     'forecast' : '30',
    //     'location' : '0%',
    //     'address' : address

    // }
    // res.send(weatherData)
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        'title': '404 Page',
        'name' : 'Avikaran',
        'message' : 'Help Page not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        'title': '404 Page',
        'name' : 'Avikaran',
        'message' : 'Page not found.'
    })
})

app.listen(port, () => {
    console.log("Server running at " + port)
})