const path = require('path')
const express = require("express")
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const Viewspath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', Viewspath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Utkarsh Kumar Yadav'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Utkarsh Kumar Yadav'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helppage: 'This is the help page for user',
        title: 'Help',
        name: 'Utkarsh Kumar Yadav'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Provide the required address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error: "Undefined error"
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: "Error happening due to parsing"
                })
            }
            res.send(forecastdata)
        }
        )
    }

    )
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pages_404', {
        title: '404',
        name: 'Utkarsh Kumar Yadav',
        msg: 'Help article not found'
    })
})

//this needs to be last as it comes after matching others
app.get('*', (req, res) => {// *match anything that is not found
    res.render('pages_404', {
        title: '404',
        name: 'Utkarsh Kumar Yadav',
        msg: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})