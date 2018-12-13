const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express()

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(`Cannot append log to file => ${err}`);
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(__dirname + '/public'))

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Joshua Puello</h1>')
    // res.send({
    //     name: 'Joshua',
    //     last_name: 'Puello'
    // })
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to the root page',
    })
})

app.get('/about', (req, res) => {
    // res.send('About page')
    res.render('about.hbs', {
        pageTitle: 'About page!',
    })
})

app.get('/bad', (req, res) => {
    res.send('Unable to handle request')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})

app.set('view engine', 'hbs')


