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
	'age': _calculateAge(new Date('1995-08-23')).toString(),
	'dateDepart': '03-11-2019',
	'hourDepart': '7'
};

module.exports = {
  information
}