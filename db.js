var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'test',
});
connection.connect(function(error){
	if(!error) {
		console.log('Database Connected Successfully..!!');
	} else {
		console.log(error);
	}
});

module.exports = connection;