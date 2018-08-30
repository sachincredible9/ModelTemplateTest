var moment = require('alloy/moment');

var pageSize =5;
var recordCount = 4500;

$.index.open();


var dataColl = Alloy.createCollection('TestModel');

function doClick() {
	return new Promise(function(resolve, reject){
		Ti.API.log('Inside doClick');
		dataColl.reset([]);	

		var i=0 ;
		for(i=0 ; i < recordCount ; i++ )
		{
			var dataSet = Alloy.createModel('TestModel');
			dataSet.set({
				Element1: "23e31b5e-7777-11e7-80f3-005056818c8e "+i ,
				Id: i,
				 Element2 :  "",
				 Element3 :"Scheduled"   , 
	
	
				 Element4: "5d3b779b-b7c3-11e7-80f6-00505681f1ce"  ,
				 Element5:  "5464 Pine Oak Ln" , 
				 Element6:  " 3647834 " ,
				 Element7:  "Memphis" ,
				 Element8:  "TNS" , 
				 Element9:  "38120" ,
				 Element10: "35.2218"  , 
				 Element11:  "-89.88057" ,
	
				 Element12:  "eebe5e0c-6b45-471d-b1e7-fb0ba4b4d541" +i ,
	
				 Element13 : "19016341512" ,
				 Element14 :  "Cell",
				 Element14  : "62f182dc-b572-4a72-97f9-064aca148347",
				 Element15  : '4898647568945',
				 Element16  : 'phone',
				 Element17  : '98547684674956',
				 Element18  : "primary@gmil.com" ,
	
				 Element19  : "2018/08/22", 
				 Element20  : "08:00", 
				 Element21   : "2018/08/22",	
				 Element22   : "17:00",
				 Element23 :  "$WOISCHSTS",	
	
				 Element24  : '57839453536' , 
				 Element25 :  "$ACTDUR",
				 Element26 :  "RQS34534",
				 Element27 :  '387938673956',
				 Element28 :   "15618415569"			 	    
			});		
			dataColl.add(dataSet);		
			Ti.API.log('...added model ==> '+dataColl.length);	
		}
				
		setTimeout(function(){	
			Ti.API.log("Resolving doClick");		
			resolve(dataColl);
		}, 1000);
		Ti.API.log('Leaving doClick  ==> '+dataColl.length);
	});
	
}
Ti.API.log('Alloy', 'AppDataDir: ' + Ti.Filesystem.applicationDataDirectory);

function test()
{
	Ti.API.log('Alloy', '*********************START TEST**********************' );
	var arrOfPromise=[];
	var i=0;
	for(i; i < pageSize; i++   ){						
		arrOfPromise.push(doClick());	
	}
	
	Ti.API.log("arrOfPromise.length = "+arrOfPromise.length);
	 return Promise.all(arrOfPromise)
	 .then(function(arrOfResp){
	 	
	 	Ti.API.log('Promise.all().then');
	 	
	 	arrOfResp.map(function (response){
	 		
	 	
	 		Ti.API.log('Before Save: '+dataColl.length);
		 	var woStartMom = moment();	 	
		 	dataColl.each(function(model){	 		
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
	Ti.API.log('*****END OF TEST ******');
});

