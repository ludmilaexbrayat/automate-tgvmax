function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const information = {
	'gareDepart': 'Montpellier',
	'gareArrivee': 'Paris',
	'numero_carte': '500381016',
	'dayBirth': '23',
	'monthBirth': '08',
	'yearBirth': '1995',
	'dateDepart': '14-10-2019',
	'hourDepart': '6',
	'isFemale': true
};

information.age =  _calculateAge(new Date(information['yearBirth']+'-'+information['monthBirth']+'-'+information['dayBirth'])).toString();

module.exports = {
  information
}