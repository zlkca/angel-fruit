var mysql = require('mysql')
var Config = require('../config')

module.exports = function(){
	
	return {
		//-------------------------------------------------------------------------------------------
		// init
		// Arguments:
		init: function(){
			var connection = mysql.createConnection({
			  'host'     : Config.dbHost,
			  'user'     : Config.dbUsername,
			  'password' : Config.dbPassword,
			  'database' : Config.dbName
			});

			return connection;
		},

		//-------------------------------------------------------------------------------------------
		// find  Database Layer API
		// tbl_name 	[string]   	--- name of the collection
		// query	[object] 	--- mongodb query format
		// cb		[function] 	--- function(err, doc){}
		find: function(tbl_name, query, cb){
			var conn = this.init();

			conn.connect(function(err){
				conn.query('SELECT * FROM ' + tbl_name, function (err, results, fields) {
				  if(err)
				  	throw err;

				  if(cb)
				  	cb(err, results, fields);

				  conn.end();
				});
			});
		},

		insert: function(tbl_name, row, cb){
			var conn = this.init();

			conn.connect(function(err){
				conn.query('INSERT INTO ' + tbl_name + ' SET ?', row, function (err, results, fields) {
				  if(err)
				  	throw err;

				  if(cb)
				  	cb(err, results, fields);

				  conn.end();
				});
			});
		}
	}
}