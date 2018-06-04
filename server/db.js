//------------------------------------------------------
// Author: zlkca
// Date: May 16 2016
// License: MIT
//------------------------------------------------------
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var Config = require('./config')
var _db = null;

if(Config.db == 'mongodb'){
}

module.exports = function(serverName, port, dbName){
	
	if(serverName==null){
		serverName = Config.dbHost;
	}
	
	if(port==null){
		port = Config.dbPort; 
	}
	
	if(dbName==null){
		dbName = Config.dbName;
	}
	
	
	return {
		//-------------------------------------------------------------------------------------------
		// connect
		// Arguments:
		//	cb --- function(err, db)
		connect: function(cb){
			if(Config.db == 'mongodb'){
				var url = 'mongodb://'+ serverName + ':' + port + '/' + dbName;
				MongoClient.connect(url, null, function(err, db){
					if(err)
						console.log('database connection error:' + err.message);
						
					_db = err == null ? db : null;
					
					if(cb)
						cb(err, db);
				});
			}else if(Config.db == 'mysql'){

			}
		},
		// To be tested
		getDatabase: function(){
			return _db;
		},
		// To be tested
		getCollection: function(name){
			if(_db)
				return null;
			
			try{
				return _db.collection(name);
			}catch(e){
				return null;
			}
		},
		
		//-------------------------------------------------------------------------------------------
		// genObjectId  Database Layer API
		//	return ObjectID
		genObjectId: function(){
			return new ObjectID();
			//return id.toHexString();
		},
		
		//-------------------------------------------------------------------------------------------
		// toObjectId  Database Layer API
		//	return ObjectID
		toObjectId: function(sid){
			return ObjectID.createFromHexString(sid);
		},
		
		//-------------------------------------------------------------------------------------------
		// findOne  Database Layer API
		// name 	[string]   	--- name of the collection
		// query	[object] 	--- mongodb query format
		// cb		[function] 	--- function(err, doc){}
		findOne: function(name, query, cb){
			this.connect(function(err, db){
				if(db){
					//db.collection(name).findOne(query, null, function(err, doc){
					db.collection(name).find(query).limit(1).next(function(err, doc){
						if(cb)
							cb(err, doc);
							
						db.close();
					});
				}
			});
		},
		//-------------------------------------------------------------------------------------------
		// find  Database Layer API
		// name 	[string]   	--- name of the collection
		// query	[object] 	--- mongodb query format
		// cb		[function] 	--- function(err, docs){}
		find: function(name, query, cb){
			this.connect(function(err, db){
				if(db){
					db.collection(name).find(query).toArray(function(err, docs){
						if(cb)
							cb(err, docs);
							
						db.close();
					});
				}
			});
		},
		
		//-------------------------------------------------------------------------------------------
		// remove  Database Layer API
		// name 	[string]   	--- name of the collection
		// query	[object] 	--- mongodb query format
		// cb		[function] 	--- function(err, doc){}
		remove: function(name, query, cb){
			this.connect(function(err, db){
				if(db){
					db.collection(name).remove(query, null, function(err, doc){
						if(cb)
							cb(err, doc);
							
						db.close();
					});
				}
			});
		},
		//-------------------------------------------------------------------------------------------
		// save  Database Layer API
		// name 	[string]   	--- name of the collection
		// obj		[object] 	--- js object
		// cb		[function] 	--- function(err, doc){}
		save: function(name, obj, cb){
			this.connect(function(err, db){
				if(db){
					db.collection(name).save(obj, null, function(err, doc){
						if(cb)
							cb(err, doc);
							
						db.close();
					});
				}
			});
		},
		
		//-------------------------------------------------------------------------------------------
		// updateOne  Database Layer API
		// name 	[string]   	--- name of the collection
		// query	[object]	--- filter
		// obj		[object] 	--- The fields and values to be update, mongodb format: {$set:{k1:v1, k2:v2}
		// cb		[function] 	--- function(err, ret){}, s = "{ ok:1, nModified:1, n:1}"
		updateOne: function(name, query, obj, cb){
			this.connect(function(err, db){
				if(db){
					db.collection(name).updateOne(query, obj, null, function(err, s){
						if(cb){
							if(typeof s == 'string')
								cb(err, JSON.parse(s));
							else
								cb(err, s);
						}
							
						db.close();
					});
				}
			});
		},

		//-------------------------------------------------------------------------------------------
		// join  Database Layer API
		// name1 	[string]   	--- local name of the collection
		// query	[object]	--- filter
		// name2 	[string]   	--- foreign name of the collection
		// obj		[object] 	--- The fields and values to be update, mongodb format: {$set:{k1:v1, k2:v2}
		// cb		[function] 	--- function(err, ret){}, s = "{ ok:1, nModified:1, n:1}"
		join: function(name1, query, name2, localField, foreignField, as, cb){
			this.connect(function(err, db){
				if(db){
					
					db.collection(name1).find(query).toArray(function(err1, docs1){
						db.collection(name2).find({}).toArray(function(err2, docs2){
							if(docs1 && docs1.length > 0 && docs2 && docs2.length > 0){
								for(var i=0; i<docs1.length; i++){
									var a = [];
									for(var j=0; j<docs2.length; j++){
										if(docs1[i][localField] == docs2[j][foreignField]){
											a.push(docs2[j]);
										}
									}
									docs1[i][as] = a;
								}
							}
							if(cb)
								cb(err1, docs1);
							
							db.close();
						});
					});
				}
			});
		}


	
	}
}


