'use static'

//setting up firebase
var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: {
    projectId: "ah-nuts",
    clientEmail: "ah-nuts-server@ah-nuts.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQD5HZUTXe0nD69B\n1jermo93u16LNitpbIrpOl/D/gg8LVNLBwmvRaA9fFmPtu/17M+hf+97aFvb9wvp\nuUN0vAyuOEKB2fbRrk1opUqa2ZRMD3WzvJsA+KnS0rF+Q8iZeJsuXaT3ubXoaebA\nmX/6M6kLJKqQ5Evy574w7w+SazEjx2I5H+zkmM77c6js5HSJpqQeYF2k8IvwU5TW\nxlImLXNyzJEIBl8rnntkGipd5ApdvQ+G5u5RndTqyofGQ9OLzAf3KVxL1HpzWL53\nF1oLG8mRlBiuszQhYei4uqiT322avKYaVvxUCbwOr4X6JTOr6FbKhgXNZaemYEn3\nkOwvBrXjAgMBAAECggEABylOi8v7cVAGHcJmv0wmK677PM1F2jYAmEvRTPUUj4ZO\nCq4dHSjHPn1Apd0AcPVp0p6257lMSrqDYSiuQ8DULH35i3oUmlqEZym5R1JR7Q3U\nuGIHorODTkg4SgTw01igPWj7wRNZo2DH/WlsQGkTxvo63QdzF3yJ/yYgMHlcZEbc\nivxYsn+Tp6wfbuMxLG03RIoiomsnb2zLVp6uemojo98EU7m2aeTOLJ/3zTxuKPw1\nZwJlLw6oB96P9/zwk30x6EyUz5joP4wLkEH2s+2l2QJSpV93/VaU1dja0YN9/Cfi\np270pZsB4m3LT8lKpukDh0J54s3yKtzi2xPANJUugQKBgQD9co1bQXRXy64AIttK\nI9gNhARMpx//AQ8kIxazOn1+vm8WHS76p9iPhf2RauMWAdpxfQv1w4KxdHkirm2r\nv7QQ5zlrlL4RaIU39Q1I6t+iJayIq+CW3HTOSQk/ips8RlxJFE0ING8Fjcis209w\nWMRThXJoGd9PcMJzKfpHtI8XMQKBgQD7n9yIAsP4GprXqrK8qFX3p8HRUuerkKm0\nLbRdAVgrU8zgLwxeC8KmpUtIWBFXoa2SL+330HANYMSk4ed4uV+FQzviBAjX3AsV\n9Q8ZkLJmpyAizdBBTdEWksrdknbO/+BA2laUYwxg+Zua8aP4kA+SLfnqKgkzrvN7\nfvd8wXsBUwKBgQD3pIqCdD5d2uK1t1lV5BgjfK9GxrX40Owefzqa/bfJtAGPNgzF\nVmPAOUg+YpZo1n6/DVQ2W0bEZe5G+PCoNLSZH5V3jOr6z4n71zGX4geJxA4FrQvR\n3K81MSAcOi7cglOCBJgQQEuKvbMrU08Xk2Shx262UTFlyeP16zpl/gMiwQKBgQCU\nB3D6xv25CRXNCMwL9tBUWOnKFobaRMnBiR3RlUfkfXFK9gLFlQ+XcCjAz6asMh5l\noTLTFlnFVQd6pLfDKvMJ+ArTpWH6c6ZF7ZxLgvehMnLSZtg8guYd7I/SGCczEg9A\nt/I1a6vNpSqo1b2MLlwquEeNPduZ/zOYlJJOX5jYpwKBgQDaEofcVi3kjy3enixv\nNEmh1pBRjbkumpcNNq8ITZot1ZxcAIe8uHyv8A+awxsBJR4R9IyY2z19z+CevWYg\n6nKz4Arlo93nquaGRbZT5peAByESE2EB2ZG2WjC4i8BUJ1zMNkESMjR1ybz7M2Pk\nJu3FURgHGRVCbVApyUgqKvtN8Q==\n-----END PRIVATE KEY-----\n"
  },
  databaseURL: "https://ah-nuts.firebaseio.com"
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