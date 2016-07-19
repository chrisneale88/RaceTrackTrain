var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Race Track Train' });
});

router.get('/racetracker', function(req,res){
    res.render('racetracker')
})

/* POST to check for valid login */
router.post("/login", function(req, res) {
    var username = req.body.userName;
    var password = req.body.userPassword;
    var serialPort = req.serialPort;
    var async = req.async;

    if( username === "Admin" && password === "password"){
        var portList = [];
        var asyncTasks = [];

        asyncTasks.push(function(done) {
            serialPort.list(function(err,ports){
                ports.forEach(function(port){
                    portList.push(port.comName);
                    //console.log(port.comName);
                });
                done();
            });
        });

        async.parallel(asyncTasks,function(){
            res.render('adminSelections', {portList: portList });
        });
    }
    else if( username === "Test" && password === "test") {
        res.location("userSelections");
        res.render("userSelections");
    }
    else {
        res.location("/");
        res.render( "index", {title: "Race Track Train", error: "Username and Password incorrect."});

    }
});

/* POST to Add User Service
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
 */
module.exports = router;
