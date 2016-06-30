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
	_getData:_getData,
	_updateDB:_updateDB,
	_updateForms:_updateForms,
	_updateSchedule:_updateSchedule,
	_buildRequestPath:_buildRequestPath,
	getDbData:getDbData,
	getEmployeeData:getEmployeeData,
	getFormData:getFormData,
	getLocationData:getLocationData,
	getScheduleData:getScheduleData
}

function _getData(thisPath) {
	
	console.log('got to _getData');
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

function _updateDB() {
	var firebaseDB = this;

	console.log('got to _updateDB');

	return new Promise(function(resolve, reject) {

		//get all future Scheduled Events
		firebaseDB._getData('/schedule/future').then(function(scheduledEvents) {
			
			//make sure the due & past due reports are current
			firebaseDB._updateForms(scheduledEvents);

			//make sure the schedule is current
			firebaseDB._updateSchedule(scheduledEvents);

			resolve();
			
		}).catch(function(error) {
			reject(error);
		});

	});

}

function _updateForms(scheduledEvents) {
	console.log('got to _updateForms');
	//get the 
	//check each scheduled event
	//Object.keys(scheduledEvents).forEach(function(key) {
		//if the event end time has passed, but the day is still the same, move to due
		
		//if the event end time has passed, and the day is different, move to Past due
	//});

	//get all the due forms
	//check each one
		//if the day is current, do nothing
		//if the day is old, move to past due
}	

function _updateSchedule(scheduledEvents) {
	console.log('got to _updateSchedule');
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