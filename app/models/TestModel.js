exports.definition = {
	config: {
		columns: {
		   "Element1" : "TEXT PRIMARY KEY",///"text PRIMARY KEY NOT NULL",
			"Id": "text ", // √
			"Element2": "text", //TODO - Do we have mapping for this in response?
			"Element3": "text", // √


			"Element4": "text", // √
			"Element5": "text", // √
			"Element6": "text", // √
			"Element7": "text", // √
			"Element8": "text", // √
			"Element9": "text", // √
			"Element10": "text", // √ 
			"Element11": "text", // √

			"Element12": "text",

			"Element13" : "text",
			"Element14" : "text",
			"Element15" : "text",
			"Element16" : "text",
			"Element17" : "text",
			"Element18" : "text",
			"Element19" : "text",

			"Element20": "text", // √ 
			"Element21": "text", // √
			"Element22": "text", // √	
			"Element23": "text", // √
			"Element24": "text",	//TODO Parsed from ApptSchedule -> Type

			"Element25": "text", // √ Use the techId we called query for
			"Element26" : "text",
			"Element27" : "text",
			"Element28" : "text",
			"Element29" : "text"	,
			"isSelected":"INTEGER",
			//"testField":"TEXT"			  
		},
		defaults: {
			"Element24" : "",
			"Element26" : "-",
			"Element27" : ""
		},
		adapter: {
			type: "sql",
			collection_name: "TestModel",
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

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/						
		});

		return Collection;
	}
};