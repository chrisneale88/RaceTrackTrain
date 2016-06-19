/**
 * Created by Karen on 16/06/2016.
 */
/* ./utils/crud.js */

/* Open connection to Mongo database */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/racetracktrain');
var db = mongoose.connection;
var schemas = require('./schemas');

var Users = mongoose.model('users', schemas.userschema);
var Racers = mongoose.model('races', schemas.raceschema);

db.on('error', console.error.bind(console, 'connection error:'));

function authenticateUser(username, password, callback) {
    db.once('open', function() {
       Users.findOne({'userName': username, 'password' : password}, function(err, results) {

           // TODO Handle Errors
           //if(err) callback(err);

           if(results !== null) callback(true);
           else callback(false);
       });
    });
}

function getUser(username, callback) {
    db.once('open', function() {
        Users.findOne({ 'userName': username}, function(err, user) {
            if(err) callback(err);
            callback(user);
        })

    });
}

function getAllUsers(callback){
    db.once('open', function() {
        Users.find(function (err, users) {
                        if (err) callback(err);
                         callback(users);
        });
    });
}

module.exports.getallusers = getAllUsers;
module.exports.getuser = getUser;
module.exports.authenticateuser = authenticateUser;