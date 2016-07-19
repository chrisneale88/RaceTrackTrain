/**
 * Created by Karen on 16/06/2016.
 */
/* ./utils/crud.js */

var mongoose = require('mongoose');
var schemas = require('./schemas');

var Users = mongoose.model('users', schemas.userschema);
var Races = mongoose.model('races', schemas.raceschema);

function authenticateUser(username, password, callback) {

    /* Open connection to Mongo database */
    mongoose.connect('mongodb://localhost/racetracktrain');

    var db = mongoose.connection;
    db.once('open', function() {
       Users.findOne({'userName': username, 'password' : password}, function(err, results) {
           db.close();
           // TODO Handle Errors
           if(err) {

               callback(err, null);
           }
           if(results !== null) {
               callback(err, true);
           }
           else {
               callback(err, false);
           }
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

function getAllRaces(callback) {
    /* Open connection to Mongo database */
    mongoose.connect('mongodb://localhost/racetracktrain');

    db.once('open', function() {
        Races.find(function(err, races) {
            db.close();
            if(err) {
                callback(err);
            }
            callback(races);
        });
    });
}

function addRace(raceInfo, callback) {
    /* Open connection to Mongo database */
    mongoose.connect('mongodb://localhost/racetracktrain');

    var race = new Races(raceInfo);
    race.save(function(err) {
        if(err) {
            console.log(err);
            callback(err);
        } else {
            console.log("successfully added race: " + raceInfo);
            callback(raceInfo);
        }

    })
}

module.exports.getallusers = getAllUsers;
module.exports.getuser = getUser;
module.exports.authenticateuser = authenticateUser;
module.exports.getallraces = getAllRaces;

module.exports.addrace = addRace;