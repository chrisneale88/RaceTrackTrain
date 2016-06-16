/**
 * Created by Karen on 16/06/2016.
 */
/* ./utils/crud.js */

/* Open connection to Mongo database */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/racetracktrain');
var db = mongoose.connection;
var schemas = require('./schemas');

db.on('error', console.error.bind(console, 'connection error:'));

var Racers = mongoose.model('races', schemas.raceschema);

function getUsers(callback){
    db.once('open', function() {
        var Users = mongoose.model('users', schemas.userschema);

        Users.find(function (err, users) {
                        if (err) callback(err);
                         callback(users);
        });
    });
};

module.exports.getusers = getUsers;