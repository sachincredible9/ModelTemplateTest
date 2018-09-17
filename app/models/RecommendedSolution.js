exports.definition = {
	config: {
		columns: {
		     "Id":"TEXT PRIMARY KEY",
		     "ProductCode":"TEXT",
		     "InspectionId":"TEXT",
		     "AppointmentId":"TEXT",		
		     "ProductDescription":"TEXT",			
			 "ServiceLine":"TEXT",
			 "ServiceLine1":"TEXT",
			 "ServiceLine2":"TEXT",
			 "ServiceLine3":"TEXT",
			 "Status":"TEXT",
			 "isAnswered": "INTEGER",
			 "selectionType" : "TEXT",
			 "MarketType": "TEXT",
      		 "Category": "TEXT",
      		 "TemplateCode":"TEXT",
      		 "PricingScreenReference":"TEXT",      		  		 
		},
		
		adapter: {
			type: "sql",
			collection_name: "RecommendedSolution",
			idAttribute: "Id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			
			deleteAll : function() {
 
        		var collection = this;
 
        		var sql = "DELETE FROM " + collection.config.adapter.collection_name;
        		db = Ti.Database.open(collection.config.adapter.db_name);
        		db.execute(sql);
       			db.close();
 
        		collection.trigger('sync');
 
      		},
      		
      		saveAll : function() {
        		var collection = this;
 
        		var dbName = collection.config.adapter.db_name;
        		var table = collection.config.adapter.collection_name;
        		var columns = collection.config.columns;
 
        		db = Ti.Database.open(dbName);
        		db.execute("BEGIN;");
 
        		collection.each(function(model) {
 
         		 /*if (!model.id) {
           			model.id = guid();
            		model.attributes[model.idAttribute] = model.id;
          		}*/
 
          		var names = [], values = [], q = [];
          		for (var k in columns) 
          		{
            		names.push(k);
            		values.push(model.get(k));
            		q.push("?");
          		}
          		var sqlInsert = "INSERT OR REPLACE INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
 
          		db.execute(sqlInsert, values);
 
        		});
 
        		db.execute("COMMIT;");
        		db.close();
 
        		collection.trigger('sync');
      		},
      		insertRecord : function(opts) {
                var collection = this;
			       var dbName = collection.config.adapter.db_name;
			       var table = collection.config.adapter.collection_name;
			       var columns = collection.config.columns;
			       var names = [], q = [];
			       for (var k in opts.query.columns) {
			            names.push(opts.query.columns[k]);
			            q.push("?");
			       }
			       var sql = "INSERT INTO " + table + 
			                 " (" + names.join(",") + ") VALUES (" +   q.join(",") + ");";
			
			       db = Ti.Database.open(collection.config.adapter.db_name);
			       db.execute(sql, opts.query.value);
			       db.close();
			       collection.trigger('sync');
			            },
			
			insertORReplaceRecord : function(opts) {
			       var collection = this;
			       var dbName = collection.config.adapter.db_name;
			       var table = collection.config.adapter.collection_name;
			       var columns = collection.config.columns;
			       var names = [], q = [];
			       for (var k in opts.query.columns) {
			            names.push(opts.query.columns[k]);
			            q.push("?");
			       }
			       var sql = "INSERT OR REPLACE INTO " + table + 
			                 " (" + names.join(",") + ") VALUES (" +   q.join(",") + ");";
			
			       db = Ti.Database.open(collection.config.adapter.db_name);
			       db.execute(sql, opts.query.value);
			       db.close();
			       collection.trigger('sync');
			            },
			
			updateRecord : function(opts) {            
			       var collection = this;
			       var dbName = collection.config.adapter.db_name;
			       var table = collection.config.adapter.collection_name;
			       var columns = collection.config.columns;
			       var names = [], whereQ = [], values=[];       
			       
			       for (var i in opts.query.columns) {
			           names.push(opts.query.columns[i]+"=?");
			       }
			       for (var i in opts.query.whereKey) {
			           whereQ.push(opts.query.whereKey[i]+"=?");
			       }
			                
			        //Values of Set Columns and Where Condition
			        for (var j in opts.query.values) {
			            values.push(opts.query.values[j]);
			        }
			        for (var k in opts.query.whereValue) {
			            values.push(opts.query.whereValue[k]);
			        }
			                
			                var sql = "UPDATE " + table + " SET " + 
			                 names.join(",") + " WHERE "+ whereQ.join(" AND ");
					////Ti.API.info('sql'+sql);
			       db = Ti.Database.open(collection.config.adapter.db_name);
			       db.execute(sql, values);
			       db.close();
			       collection.trigger('sync');
            },

            deleteRecord : function(opts) {
			       var collection = this;
			       var dbName = collection.config.adapter.db_name;
			       var table = collection.config.adapter.collection_name;
			       var columns = collection.config.columns;
			       var names = [], q = [];
			       for (var k in opts.query.columns) {
			            names.push(opts.query.columns[k]);
			            q.push("?");
			       }
			       var sql = "DELETE FROM " + table + " " + opts.query.sql;
			
			       db = Ti.Database.open(collection.config.adapter.db_name);
			       db.execute(sql, opts.query.params);
			       db.close();
			       collection.trigger('sync');
			            },
					});

					return Collection;
	}
};