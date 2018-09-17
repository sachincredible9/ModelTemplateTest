var moment = require('alloy/moment');



$.index.open();

Alloy.Collections.instance('RecommendedSolution');

var dataColl1 = Alloy.createCollection('RecommendedSolution');

function doClick() {
	return new Promise(function(resolve, reject){
		Ti.API.log('Inside doClick');
		
		
		// Add Recommended Solution Records		
		addRecommendedRecords();		
		 
				
		setTimeout(function(){	
			Ti.API.log("Resolving doClick");		
			resolve(dataColl1);
		}, 1000);
		Ti.API.log('Leaving doClick  ==> '+dataColl1.length);
	});
	
}
Ti.API.log('Alloy', 'AppDataDir: ' + Ti.Filesystem.applicationDataDirectory);

function test()
{
	Ti.API.log('Alloy', '*********************START TEST**********************' );
	var arrOfPromise=[];
	var i=0;
	for(i; i < 1; i++   ){						
		arrOfPromise.push(doClick());	
	}
	
	Ti.API.log("arrOfPromise.length = "+arrOfPromise.length);
	 return Promise.all(arrOfPromise)
	 .then(function(arrOfResp){
	 	
	 	Ti.API.log('Promise.all().then');
	 	
	 	arrOfResp.map(function (response){
	 		
	 	
	 		Ti.API.log('Before Save: '+dataColl1.length);
		 	var woStartMom = moment();	 	
		 	
	 		
	 		dataColl1.each(function(model){	 		
		 		model.save();
	 		});	 		 	
	 		Ti.API.log('...After Save:' + moment().diff(woStartMom) + ' ms');	 	
	 	});
	 }).then(function (){
		Ti.API.log('********All Test executed SUCESSFULLY.********');
	 }).catch(function(err) {
	 	Ti.API.log('Caught error: ' +JSON.stringify(err));
	 });
	
}

Ti.API.log('*****Start OF TEST ******');
test().then(function () {
	
	// Populate Data in to  Recommended ListView.
	loadRecommSolution();	
});


function addRecommendedRecords(){
	Ti.API.log('Inside function addRecommendedRecords');
	dataColl1.reset([]);	

		var i=0 ;
		for(i=0 ; i < 10 ; i++ )
		{
			var dataSet = Alloy.createModel('RecommendedSolution');
			dataSet.set({
			 Id:i ,
		     ProductCode:"23e31b5e-7777-11e7-80f3-005056818c8e "+i,
		     InspectionId:"374629356875"+i,
		     AppointmentId:"23462384",		
		     ProductDescription:"RElated Repair "+i,			
			 ServiceLine:"fhsvs",
			 ServiceLine1:"lnkgjdfbgk",
			 ServiceLine2:"jhgkgdkg",
			 ServiceLine3:"lhkgjh",
			 Status:"SOLDD",
			 isAnswered: 1,
			 selectionType : "434",
			 MarketType: "8759345",
      		 Category: "34762834",
      		 TemplateCode:"238723",
      		 PricingScreenReference:"232",        		 
			});		
			dataColl1.add(dataSet);		
			Ti.API.log('...added model ==> '+dataColl1.length);
			//dataColl1.save();
			// dataColl1.set({
				// isSelected : 1
			// });							
		}			
	Ti.API.log('Leaving function addRecommendedRecords');
}

/* data filter to display the selected product in the cart*/
function filterRecommSolu(collection) {
	Ti.API.log('Inside filterRecommSolu..==>>>'+JSON.stringify(collection));
	return collection.where({
		isSelected : 1
	});	
}

function deleteRecord(e) {
	
	Ti.API.info('deleteRecord e : ' + JSON.stringify(e));
	
	var selectedProductId = e.itemId;
	
	var selectedProductCode = selectedProductId;
	var recommendedSolutionModel = null;

	
	var productsColl = Alloy.Collections.instance('RecommendedSolution');
	
	Ti.API.log('productsColl = '+productsColl.length);
	Ti.API.log('Here Length = '+JSON.stringify(productsColl));	
	var recommSolution = productsColl.where({
		isSelected: 1
	});
	Ti.API.log('Aftre Length = '+recommSolution.length);
	Ti.API.log('fter Length = '+JSON.stringify(recommSolution));
	
	var recommendedSolutionModel = recommSolution[0];	

	
	Ti.API.log("DATATA == "+JSON.stringify(recommendedSolutionModel));
	recommendedSolutionModel.set({
		isSelected: 0,
		cartSequence : null		
	});
	Ti.API.info('End of Function ..'+JSON.stringify(recommendedSolutionModel));
}

function loadRecommSolution() {
	Ti.API.log('Inside loadRecommSolution');	
	var productsColl = Alloy.Collections.instance('RecommendedSolution');
	productsColl.fetch();		
	
	//TEST
	var listItemsDataArray = [];	
	$.section.setItems(listItemsDataArray);
	
	if(productsColl.length > 0){
				
		productsColl.each(function(record) {
				
			var listRow = {};
			
			listRow["product"]={
				text:record.get('ProductDescription')
			};
			 
			listRow["itemId"] = {
				text : record.get('ProductCode')
			};
			
			listRow["isSelected"] = {
				text : 1
			};
			
			listRow["properties"] = {
				canEdit : true
			};
	
			listItemsDataArray.push(listRow);	
			
			
		});
	}
	
	$.section.setItems(listItemsDataArray);
	
	//After Loading to List View mark recommended to 1	
	if(productsColl.length > 0){
		productsColl.each(function(record) {
			record.set({
					isSelected:1,
					
				});				
		});
	}
	
	//END	
	Ti.API.log('Leaving loadRecommSolution UPDATE ='+JSON.stringify(productsColl));
}

 
