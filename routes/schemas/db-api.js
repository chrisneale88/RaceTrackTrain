/**
 * Created by Karen on 16/06/2016.
 */
/* ./routes/schemas/db-api.js */

/* Open connection to Mongo database */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/racetracktrain');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
/* Mongodb schema for users */

var userSchema = {
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    privilegeLevel: String
}

/* Mongodb schema for races */

var raceSchema = {
    name: String,
    location: String,
    locationLat: String,
    locationLng: String,
    startDate: Date,
    finishDate: Date,
    organiser: String,
    company: String,
    laps: String,
    noOfRacers: String
}


var Racers = mongoose.model('races', raceSchema);


function getUsers() {
    db.once('open', function() {
        var Users = mongoose.model('users', userSchema);
        Users.find(function (err, users) {
            if (err) return err;
            console.log(users);
            return users;
        });
    });
};


module.exports.getusers = getUsers;