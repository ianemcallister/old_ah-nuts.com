'use static'

//setting up firebase
var firebase = require("firebase");
var environment = process.env.NODE_ENV;
if(typeof process.env.NODE_ENV == 'undefined') { //undefined means development
	var AH_NUTS_SECRETS = require('./env.js');
	var FIREBASE_ID = AH_NUTS_SECRETS.FIREBASE_ID;
	var FIREBASE_EMAIL = AH_NUTS_SECRETS.FIREBASE_EMAIL;
	var FIREBASE_KEY = AH_NUTS_SECRETS.FIREBASE_KEY;
	var FIREBASE_DB = AH_NUTS_SECRETS.FIREBASE_DB;
} else {							//this is production, pull from the env
	var FIREBASE_ID = process.env.AH_NUTS_FIREBASE_ID;
	var FIREBASE_EMAIL = process.env.AH_NUTS_FIREBASE_EMAIL;
	var FIREBASE_KEY = process.env.AH_NUTS_FIREBASE_KEY;
	var FIREBASE_DB = process.env.AH_NUTS_FIREBASE_DB;
}

console.log('environment', environment);
console.log(FIREBASE_ID);
console.log(FIREBASE_EMAIL);
console.log(FIREBASE_KEY);
console.log(FIREBASE_DB);

//initialize the connection
firebase.initializeApp({
  serviceAccount: {
    projectId: FIREBASE_ID,
    clientEmail: FIREBASE_EMAIL,
    privateKey: FIREBASE_KEY
  },
  databaseURL: FIREBASE_DB
});

var rootParent = firebase.database().ref();

var ahNutsFirebase = {
	_currentDateTime:_currentDateTime,
	_addToList:_addToList,
	_formatDate:_formatDate,
	_twentfyfourTime:_twentfyfourTime,
	_getData:_getData,
	_updateData:_updateData,
	_updateDB:_updateDB,
	_updateForms:_updateForms,
	_updateSchedule:_updateSchedule,
	_buildRequestPath:_buildRequestPath,
	_checkEventStatus:_checkEventStatus,
	_jobsToPromises:_jobsToPromises,
	_moveRecord:_moveRecord,
	_checkPastDueMarketReceipts:_checkPastDueMarketReceipts,
	_addNewMarketReceiptPrompts:_addNewMarketReceiptPrompts,
	getDbData:getDbData,
	getEmployeeData:getEmployeeData,
	getFormData:getFormData,
	getLocationData:getLocationData,
	getScheduleData:getScheduleData
}

function _currentDateTime() {
	var firebaseDB = this;
	var newTime = new Date();

	return { 
		date: firebaseDB._formatDate(newTime),
		time: firebaseDB._twentfyfourTime(newTime)
	}
}

function _formatDate(time) {
	//console.log(time);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var day = time.getDate();

	if(month < 10) month = "0" + month;
	if(day < 10) day = "0" + day;

	var formatedDate = year + month + day;

	//console.log(year, month, day, formatedDate);
	return formatedDate;
}

function _twentfyfourTime(time) {
	var hour = time.getHours();
	var mins = time.getMinutes();

	if(hour < 10) hour = "0" + hour;
	if(mins < 10) mins = "0" + mins;

	var formattedTime = hour + "" + mins;
	//console.log(formattedTime);
	return formattedTime;
}

function _addToList(arrayOfLists) {
	var returnArray = [];

	//iterate through the lists
	arrayOfLists.forEach(function(list) {

		//if list objects are also lists
		if(typeof list == 'object') {

			//iterate over the list
			list.forEach(function(item) {

				returnArray.push(item);

			});

		} else returnArray.push(list);

	});

	return returnArray;
}

function _getData(thisPath) {
	
	return new Promise(function(resolve, reject) {
		//resolve('got it: ' + requirnments.db);

		rootParent.child(thisPath).on("value", function(snapshot) {
			
			var values = snapshot.val();
			resolve(values);

		}, function(error) {
			reject(error);
		});

	});
}

function _updateData(move) {
	var record = move.key;
	var startPath = rootParent.child(move.from).child(record);
	var endPath = rootParent.child(move.to);
	var object = move.object;
	
	return new Promise(function(resolve, reject) {

		//save to the new location
		endPath.child(record).set(object, function(e) {
			if(e) { console.log("Error:", e); reject(e); }
			else {
				console.log(record, 'added successfully.');

				//remove from the old location
				startPath.set({}, function(e) {
					if(e) { console.log("Error:", e); reject(e); }
					else { console.log(record, 'removed successfully.'); resolve();}
				});
			}
		})

	});

}

function _updateDB() {
	var firebaseDB = this;
	var currentDateTime = firebaseDB._currentDateTime();

	console.log('got to _updateDB', currentDateTime);

	return new Promise(function(resolve, reject) {

		//get all future Scheduled Events
		firebaseDB._getData('/schedule/future').then(function(scheduledEvents) {
			
			//make sure the due & past due reports are current
			firebaseDB._updateForms(scheduledEvents, currentDateTime)
			.then(function() {

				//make sure the schedule is current
				firebaseDB._updateSchedule(scheduledEvents, currentDateTime)
				.then(function() {

					//if all the async work was completed, return
					resolve();

				}).catch(function(e) {
					reject(e);
				});

			}).catch(function(e) {
				reject(e);
			});

		}).catch(function(error) {
			reject(error);
		});

	});

}

function _updateForms(scheduledEvents, currentDateTime) {
	var firebaseDB = this;

	console.log('got to _updateForms');
	
	return new Promise(function(resolve, reject) {

		//get the current market Receipts
		firebaseDB._getData('/forms/market_receipts').then(function(pendingReceipts) {
		
			//check if the previously due are now past due
			var receiptChanges = firebaseDB._checkPastDueMarketReceipts(pendingReceipts, currentDateTime)
			
			//add any scheduled events that are now due or past due
			var recieptAdditions = firebaseDB._addNewMarketReceiptPrompts(scheduledEvents, currentDateTime);

			//add all the changes to a master list
			var recordsToMove = firebaseDB._addToList([receiptChanges, recieptAdditions]);

			//turn all the moves into promises
			var movePromises = firebaseDB._jobsToPromises(recordsToMove);

			console.log("recordsToMove",recordsToMove);
			//console.log("movePromises", movePromises);

			//then make all the changes to the records
			Promise.all(movePromises).then(function() {
				resolve();
			}).catch(function(e) {
				reject(e);
			});

		}).catch(function(e) {
			reject(e);
		});

	});

}	

function _updateSchedule(scheduledEvents, currentDateTime) {
	console.log('got to _updateSchedule');

	return new Promise(function(resolve, reject) {
		resolve();
	});

}

function _buildRequestPath(requirnments) {
	//declare local variables
	var pathString = '/';
	var dbs = {'employees':0, 'forms':1, 'locations':2, 'schedule': 3};

	switch(dbs[requirnments.db]) {
		case 0:
			pathString += 'employees';
			break;
		case 1:
			pathString += 'forms';

			//if there is more data add it
			if(typeof requirnments.form !== 'undefined') {

				pathString += ('/'+requirnments.form);

				if(typeof requirnments.status !== 'undefined') {

					pathString += ('/'+requirnments.status);
					
				}

			} 
			break;
		case 2:
			pathString += 'locations';
			break;
		case 3:
			break;
		default:
			break;

	}

	return pathString;
}

function _checkEventStatus(key, endTime, currentDateTime) {

	//extract the event end time
	var eventDate = key.slice(0,8);
	
	//compare the current time and the end time
	var isDue = (eventDate == currentDateTime.date && currentDateTime.time > endTime);
	var isPastDue = (eventDate < currentDateTime.date);

	if(isDue) return 'isDue';
	if(isPastDue) return 'isPastDue'
	else return 'not yet due';
}

function _jobsToPromises(listOfJobs) {
	var allPromises = [];
	var firebaseDB = this;

	
	listOfJobs.forEach(function(job) {

		allPromises.push(new Promise(function(resolve, reject) {
			
			firebaseDB._moveRecord(job).then(function(response) {
				resolve(response);
			}).catch(function(error) {
				reject(error);
			});

		}));
	});

	return allPromises;
}

function _moveRecord(job) {
	var firebaseDB = this;

	return firebaseDB._updateData(job);
}

function _checkPastDueMarketReceipts(pendingReceipts, currentDateTime) {
	var firebaseDB = this;
	var dueReceiptsToPastDue = [];

	console.log('these are the pending reciepts',pendingReceipts );

	//were there any due receipts?
	if(typeof pendingReceipts.due !== 'undefined') {
		
		//if so, iterate through the due
		Object.keys(pendingReceipts.due).forEach(function(key) {
			
			//check the event status
			var status = firebaseDB._checkEventStatus(key, pendingReceipts.due[key].times.end, currentDateTime);
			
			//decide what to do 
			if(status == 'isDue') {
				//no need to change anything
			} else if (status == 'isPastDue') {
				//add to the list to move
				dueReceiptsToPastDue.push({
					from: 'forms/market_receipts/due',
					to: 'forms/market_receipts/past_due',
					key: key,
					object: pendingReceipts.due[key]
				})
			} else {
				console.log('an error occured');
			}

		});
		
		return dueReceiptsToPastDue;
		
	} else return null;

}

function _addNewMarketReceiptPrompts(scheduledEvents, currentDateTime) {
	var firebaseDB = this;
	var scheduledEventsNeedReciepts = [];
	console.log('these are the scheduledEvents',scheduledEvents );
	//check each scheduled event to see if new events are due or Past due
	Object.keys(scheduledEvents).forEach(function(key) {
		
		//check the event status
		var status = firebaseDB._checkEventStatus(key, scheduledEvents[key].times.end, currentDateTime);
		console.log(key, status);
		//decide what to do 
		if(status == 'isDue') {
			//ad to the list to move
			scheduledEventsNeedReciepts.push({
				from: 'schedule/future',
				to: 'forms/market_receipts/due',
				key: key,
				object: scheduledEvents[key]
			});
		} else if (status == 'isPastDue') {
			//add to the list to move
			scheduledEventsNeedReciepts.push({
				from: 'schedule/future',
				to: 'forms/market_receipts/past_due',
				key: key,
				object: scheduledEvents[key]
			});
		} else {
			//nothing to do
		}

	});

	return scheduledEventsNeedReciepts;
}

function getDbData(requirnments) {
	//declare local variables
	var firebaseDB = this;

	//declare local variables
	var thisPath = firebaseDB._buildRequestPath(requirnments);

	//returning promises
	return firebaseDB._getData(thisPath);

}

function getEmployeeData() {}
function getFormData(formRequest) {
	var thisPath = formRequest.form + '/' + formRequest.status;

	return new Promise(function(resolve, reject) {
		rootParent.child(thisPath).on("value", function(snapshot) {
			var values = snapshot.val();
			var returnArray = [];

			Object.keys(values).forEach(function(key) {
				
				returnArray.push(values[key]);
			})

			//then 

			resolve(returnArray);
		}, function(error) {
			reject(error);
		});		
	})

}
function getLocationData() {}
function getScheduleData() {}

module.exports = ahNutsFirebase;