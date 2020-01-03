const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/gecode');
const forecast = require('./utils/forecast');


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prajesh Anchalia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        text: 'Software Development Engineer with Verizon Media',
        name: 'Prajesh Anchalia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'Some help text',
        name: 'Prajesh Anchalia'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, place_name, (error, data) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                } else {
                    return res.send({
                        forecast: data
                    })
                }
            });
        }
    });
    // res.send({
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        text: '404: Help page not found',
        name: 'Prajesh Anchalia'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: '404: Page not found',
        name: 'Prajesh Anchalia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})