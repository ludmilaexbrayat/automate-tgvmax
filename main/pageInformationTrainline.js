const userInformation = require('./userInformation').information;

// const url = "https://www.sncf-connect.com/";
// const url = "https://www.sncf-connect.com/app/home/search";
const url = "https://www.thetrainline.com/fr";

const location = {
	'closeCookie': '#onetrust-accept-btn-handler',
	'searchTo':'#from\\.search',
	'searchFrom': '#to\\.search',
	// 'selectGareDepart': '#vsb-origin-0',
	// 'gareArrivee': '#vsb-destination-train-launch',
	// 'selectGareArrivee': '#vsb-destination-0',
	// 'dateDepart': '#vsb-departure-train-launch-date-time',
	// 'hourDepart': '#vsb-departure-train-launch-modal-start-time',
	// 'jeValideCetAller': '#vsb-departure-train-launch-modal-submit',
	// 'ageRange':'#passenger_1_train-launch-typology',
	// 'typeAgeRange': 'typology-YOUNG',
	// 'age': '#passenger_1_train-launch_age',
	// 'subscriptionCard': '#passenger_1_train-launch-discount-card-type',
	// 'typeSubscriptionCard': 'HAPPY_CARD',
	// 'subscriptionNumber': '#passenger_1_train-launch-discount-card-number',
	// 'fillSubscriptionNumber': '#passenger_1_train-launch-discount-card-number-placeholder',
	// 'openBirthDate': '#passenger_1_train-launch-discount-card-dateofbirth',
	// 'dayBirth': '#passenger_1_train-launch-discount-card-dateofbirth > div.oui-date-input__date-part-container___3620 > input:nth-child(1)',
	// 'monthBirth': '#passenger_1_train-launch-discount-card-dateofbirth > div.oui-date-input__date-part-container___3620 > input:nth-child(2)',
	// 'yearBirth': '#passenger_1_train-launch-discount-card-dateofbirth > div.oui-date-input__date-part-container___3620 > input:nth-child(3)',
	// 'rechercher': '#vsb-booking-train-launch-submit',
	// 'prices0': "//span[@data-price='0' and @data-auto='DATA_PRICE_BTN_PRICEBTN_SECOND']",
	// 'afficherTrajetsSuivants': "//span[@data-auto='LINK_TRAVEL_NEXT_HOUR']",
	// 'jeChoisisCetAller': "//button[@class='oui-button___3560 travel-card__submit']",
	// 'jeValidePlacement': "//button[@class='oui-button___3560 oui-button__placement']",
	// 'continuer1': "//button[@class='oui-button___3635 oui-button--medium___3635']",
	// 'continuer2': "//button[@class='oui-button___3635 cart-page__cta']",
	// 'checkBox': "//span[contains(@class, 'oui-checkbox__selector')]",
	// 'valider': "//button[@value='Valider ma commande']"
};


// location.selectDateDepart = '#train-launch-d-'+userInformation['dateDepart'];
// if (userInformation['isFemale']) 
// 	{location.gender = "//label[contains(@for, 'MADAM')]"} 
// else 
// 	{location.gender = "//label[contains(@for, 'MISTER')]"};


module.exports = {
  location,
  url
}