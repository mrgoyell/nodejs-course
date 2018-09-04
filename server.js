const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
    var now = String(new Date());
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to process request');
        }
    });
    next();
});
//EXPRESS MIDDLEWARE
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance',
//         pageInfo: 'This page is under maintenance'
//     });
// });

app.use(express.static(__dirname+'/public'));  //__dirname stores path to project directory

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
    // return 'yo';
});

hbs.registerHelper('screamIt',(str)=>{
    return str.toUpperCase();
});
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
      name: 'Rishabh',
      likes: [
        'Biking',
        'Cities'
      ],
      pageTitle: 'Home Page',
      welcomeMessage: 'Welcome to Rishabh\'s home',
    });
  });
  
  app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Test Page',
    });
  });

app.get('/bad',(req,res) =>{
    res.send({
        errorMessage: 'This is an error message',
        test: 'The test property',
        arr: [2,3,55,'done']
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});