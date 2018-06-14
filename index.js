var express = require('express');
var bp = require('body-parser');
var db = require('./models'); 

var app = express();

app.use(express.static(__dirname + '/static'));
app.use(bp.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// ROUTES

//GET - READ ALL
app.get('/users', function(req,res) {
    db.user.findAll().then(function(data) {
        res.render('users/index', {users: data});
    })
})

//GET - CREATE ONE => send form
app.get('/users/new', function(req,res) {
    res.render('users/new');
})

//POST - CREATE ONE
app.post('/users', function(req,res) {
    db.user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email
    }).then( function(data) {
        console.log(data);
        res.redirect('/users');
    })
})

//GET - EDIT ONE => send form
app.get('/users/:id/edit', function(req,res) {
    db.user.find({
        where: {id: req.params.id}
    }).then( function(data) {
        res.render('users/edit', {user: data});
    })
})

//PUT - EDIT ONE
app.put('/users/:id', function(req,res) {
    db.user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email 
    }, {
        where: {id: req.params.id}
    }).then( function(data) {
        console.log(data);
        res.send(data);
    })
})

//DELETE - DESTROY ONE
app.delete('/users/:id', function(req,res) {
    db.user.destroy({
        where: {id: req.params.id}
    }).then( function(data) {
        console.log(data);
        res.sendStatus(200);
    })
})


app.listen(3000, function(){
    console.log('app is running on 3000');
})