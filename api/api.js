'use static'

var api = {
	_getCurrentTime:_getCurrentTime,
	_getMarketTimesHash:_getMarketTimesHash,
	supplyGuess:supplyGuess,
	test: test
}

function _getCurrentTime() {
	return new Date().getTime();
}

function _getMarketTimesHash() {
	//pull this data from an ultimate source later
	return {
		Tuesday: [
			{start: 900, end: 1140, name: 'Bixby Park'},
			{start: 1020, end: 1260, name: 'Surf City Nights'}
		],
		Wednesday: [
			{start: 600, end: 840, name: 'Irvine - Discovery'},
			{start: 960, end: 1200, name: 'Twila Reid Park'}
		],
		Thursday: [{start: 660, end: 960, name: 'Anaheim Promenade'}],
		Friday: [
			{start: 720, end: 1020, name: 'Huntington Beach Pier'},
			{start: 1020, end: 1260, name: 'Monrovia Street Fair'}
		], 
		Saturday: [{start: 600, end: 900, name: 'Bixby Park'}],
		Sunday: [{start: 600, end: 840, name: 'Great Park'}]
	}
}

function supplyGuess(gps) {

	//based on the time, guess the best market
	var marketTimesHash = this._getMarketTimesHash();

	return marketTimesHash;
}

function test() {
	return { items: [
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'},
			{placeholder:'testing'}
			] 
		};
}

module.exports = api;