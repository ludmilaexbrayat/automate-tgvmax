function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const information = {
	'departureStation': 'Briançon',
	'arrivalStation': 'Paris',
	'numero_carte': '000000000',
	'dayBirth': '01',
	'monthBirth': '01',
	'yearBirth': '2000',
	'dateDepart': '01-11-2019',
	'hourDepart': '17',
	'isFemale': true
};

information.age =  _calculateAge(new Date(information['yearBirth']+'-'+information['monthBirth']+'-'+information['dayBirth'])).toString();

module.exports = {
  information
}