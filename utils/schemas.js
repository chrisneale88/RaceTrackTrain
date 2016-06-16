/**
 * Created by Karen on 16/06/2016.
 */
/** ./routes/schemas.js */

module.exports.userschema = {

        userName: String,
        password: String,
        firstName: String,
        lastName: String,
        dateOfBirth: Date,
        privilegeLevel: String

};

module.exports.raceschema = {
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
};