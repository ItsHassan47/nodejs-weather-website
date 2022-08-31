const path = require('path');   // node module for directory path
const express = require('express');
const hbs = require('hbs'); // template engine to render dynamic pages, handle bars (hbs)
const posStack = require('./util/posstack.js');
const wheatherStack = require('./util/weatherstack');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// index page, render when we will 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Muhammad Hassan'
    });
});

// about page, render is for dynamic document and send is for static document
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Muhammad Hassan'
    });
});

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Muhammad Hassan'
    });
});

// will send the JSON to the /weather URL
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    // will taking the address from URL and return latitude, longitude, location
    posStack(req.query.address, (error, { latitude, longitude, location } = {}) => {    // {} is for destructing obj to variables
        if (error) {
            return res.send({ error });
        }
        // will take the latitude, longitude and return the weather and send late the func will send to browser as JSON
        wheatherStack(latitude, longitude, (wheatherData, wheatherError) => {
            if (wheatherError) {
                return res.send({ error });
            }
            res.send({  // the will JSON to localhost:3000/weather/
                forecast: wheatherData,
                location,
                address: req.query.address
            });
        });
    });
});

// if user tries to excess pages that doesnt exist
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muhammad Hassan',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Muhammad Hassan',
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
