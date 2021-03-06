const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
    // app.get('/', (req, res) => {
    //     res.render('maintenance.hbs');
    // });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: "Welcome to my website!!!",
        pageTitle: 'Home Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'The requested page was not found!'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});