var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool ({
	host	: 'localhost',
	user	: 'root',
	password	: 'toor',
	database: 'racetracktrain'
});


router.post('/', function( req, res, next ) {
  try {
			var username = req.body.userName;
			var password = req.body.password;

				var sql = "SELECT * FROM user WHERE ?? = ? AND ?? = ?";
				var inserts = ['user_username', username, 'user_password', password];
				sql = mysql.format(sql, inserts);

				pool.getConnection(function(err, connection) {
					if (err) {
						console.log("Cannot connect to database.");
						return;
					} else {
						connection.query(sql, function (error, results) {
							connection.release();
							if(error) {
								var html = error({'error': error});
								res.send("There seems to be an issue :S");
								console.log("\nError querying database!" + error);
							}
							if(!results.length) {
                var errorMessage = "The Username and Password combination was incorrect."
								console.log("User login unauthorised");
								res.render('index', {errormessage: errorMessage});
							} else {
								console.log("User has logged in: " + results[0].user_username);
								var adminRights = false;
								if(results[0].user_adminrights) {
									adminRights = true;
								}

								console.log(adminRights);

								pool.getConnection( function(err, connection) {
									if (err) {
										console.log("Error: Could not get open connection to database.");
										return;
									} else {
										connection.query('SELECT * FROM race', function(error, results) {
											connection.release();
											if(error) {
												res.send("Error: Database connection lost during query.");
											}
											if(!results.length) {
												res.render("Error: Query returned no results.");
											} else {
												var raceNames =[];
												for(var i = 0; i<results.length; i++) {
													raceNames.push(results[i].name);
												}
												res.render('raceSelection', {racenames: raceNames, raceinfo: results, adminrights: adminRights});
											}
										})
									}
								})
							}
						})
					}
				})
  		} catch (e) {
    		next(e);
  		}
});

module.exports = router;
