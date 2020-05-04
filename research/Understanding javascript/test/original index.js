/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.launchSearch = (req, res) => {

const puppeteer = require('puppeteer');
const url = require('./pageInformation').url;
const pageLocation = require('./pageInformation').location;
const userInformation = require('./userInformation').information;

(async () => {

	//console.log('Opening the browser and the url');
	//const browser = await puppeteer.launch({headless: false});
	const browser = await puppeteer.launch({args: ['--no-sandbox']});
	const page = await browser.newPage();
	await page.goto(url);

	//console.log('Filling the information');
	await page.click(pageLocation['closeCookie']);
	await page.click(pageLocation['closeBot']);
	await page.type(pageLocation['gareDepart'], userInformation['gareDepart']); 
	await page.waitFor(pageLocation['selectGareDepart']);
	await page.click(pageLocation['selectGareDepart']);
	await page.type(pageLocation['gareArrivee'], userInformation['gareArrivee']); 
	await page.waitFor(pageLocation['selectGareArrivee']);
	await page.click(pageLocation['selectGareArrivee']);
	await page.click(pageLocation['dateDepart']);
	await page.click(pageLocation['selectDateDepart']);
	await page.select(pageLocation['hourDepart'], userInformation['hourDepart']);
	await page.click(pageLocation['jeValideCetAller']);
	await page.select(pageLocation['ageRange'], pageLocation['typeAgeRange']);
	await page.type(pageLocation['age'], userInformation['age']);
	await page.select(pageLocation['subscriptionCard'], pageLocation['typeSubscriptionCard']);
	await page.click(pageLocation['subscriptionNumber']);
	await page.waitFor(pageLocation['fillSubscriptionNumber']);
	await page.type(pageLocation['fillSubscriptionNumber'], userInformation['numero_carte']);
	await page.click(pageLocation['openBirthDate']);
	await page.type(pageLocation['dayBirth'], userInformation['dayBirth']);
	await page.type(pageLocation['monthBirth'], userInformation['monthBirth']);
	await page.type(pageLocation['yearBirth'], userInformation['yearBirth']);
	await page.click(pageLocation['rechercher']);

	//console.log('Selecting the train');
	await page.waitFor(10000); // temporary fix

	var continueLoop = true;

	while (continueLoop) {

		var listPrices = await page.$x(pageLocation['prices0']);

		if (listPrices.length > 0) {
			await listPrices[0].click();
			//console.log('A TGVMax was found!');
			var foundTrain = true;
		} else {
			var afficherTrajetsSuivants = await page.$x(pageLocation['afficherTrajetsSuivants']);
			if (afficherTrajetsSuivants.length > 0) {
				await page.waitFor(1000);
				await afficherTrajetsSuivants[0].click();
				//console.log('clicked');
			} else {
				var continueLoop = false;
				//console.log('No TGVMax was available');
				var foundTrain = false;
			};
		};
	};

	if (foundTrain) {
		await page.waitForXPath(pageLocation['jeChoisisCetAller']);
		const jeChoisis = await page.$x(pageLocation['jeChoisisCetAller']);
		await jeChoisis[0].click(); // find way to make this and below a single line
		await page.waitForXPath(pageLocation['jeValidePlacement']);
		const jeValide = await page.$x(pageLocation['jeValidePlacement']);
		await jeValide[0].click(); // find way to make this and below a single line
	
		//console.log('Confirming train');
		await page.waitForXPath(pageLocation['continuer1']);
		const continuer1 = await page.$x(pageLocation['continuer1']);
		await continuer1[0].click(); // find way to make this and below a single line
		await page.waitForXPath(pageLocation['continuer2']);
		const continuer2 = await page.$x(pageLocation['continuer2']);
		await continuer2[0].click(); // find way to make this and below a single line
	};

	//console.log('All good!');
	res.send('All good!');
	await browser.close();
})();
  
};