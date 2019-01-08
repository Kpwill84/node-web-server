const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//express middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to the server log');
    }
  });
  next();
});

//express middleware for maintenance page
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


//hbs helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  // res.send('<h1>Hello Kpandi!</h1>');
  res.render('Home.hbs', {
    pageTitle: 'Shop',
    Greeting: 'Welcome to our shoping page',
  });
});

app.get('/About', (req, res) => {
  res.render('About.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/Bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request',
  });
});

app.get('/porfortio', (req,res) => {
  res.render('porfortio.hbs', {
    pageTitle: 'My Projects',
    Greeting: 'welcome, this page will list my projects'
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
