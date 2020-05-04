/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

exports.launchSearchBasics = (req, res) => {

const puppeteer = require('puppeteer');
const url = require('./pageInformation').url;
const pageLocation = require('./pageInformation').location;
const userInformation = require('./userInformation').information;

//res.setHeader('Content-Type', 'text/html');

(async () => {
	console.log('Launching browser and page');
    //const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(url);
    console.log('Page is open');

    await page.waitFor(pageLocation['gareDepart']);
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
    console.log('Filling information is completed');

  
    var continueLoop = true;
  	await page.waitForXPath('//button[@class="price-button"]');
	console.log('URL of the page: ' + page.url() + '');
    var allPrices = await page.$x('//button[@class="price-button"]');
	console.log('Number of prices found:' + allPrices.length.toString() +'');
	await page.waitFor(5000);

	while (continueLoop) {

		var listPrices = await page.$x(pageLocation['prices0']);

		if (listPrices.length > 0) {
			await listPrices[0].click();
			var foundTrain = true;
			var continueLoop = false;
            console.log('A TGVMax was found!');
		} else {
			console.log('No TGVMax found yet');
			var afficherTrajetsSuivants = await page.$x(pageLocation['afficherTrajetsSuivants']);
	    	console.log('Found link for afficher les trajets: '+ afficherTrajetsSuivants.length.toString() +'');
            if (afficherTrajetsSuivants.length > 0) {
				console.log('Clicking "Afficher les trajets suivants"');
				//await page.waitForXPath(pageLocation['afficherTrajetsSuivants'], { visible: true });
				await afficherTrajetsSuivants[0].click();
			} else {
				var continueLoop = false;
				console.log('No TGVMax was available');
				var foundTrain = false;
			};
		};
	};
  
	await browser.close();
  	console.log('Browser was closed');
    //res.end();
})();
  
};