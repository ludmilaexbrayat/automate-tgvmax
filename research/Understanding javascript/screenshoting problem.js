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

    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    await page.goto(url);

  
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

  
    var continueLoop = true;
//    await page.waitFor(4000);
  	await page.waitForXPath('//button[@class="price-button"]');
//    await page.waitForNavigation({waitUntil: 'networkidle0'});
	const buffer = await page.screenshot({fullPage: true});
    res.type('image/png').send(buffer);
    var allPrices = await page.$x('//button[@class="price-button"]');


	while (continueLoop) {

		var listPrices = await page.$x(pageLocation['prices0']);

		if (listPrices.length > 0) {
			await listPrices[0].click();
			var foundTrain = true;
			var continueLoop = false;
		} else {
			var afficherTrajetsSuivants = await page.$x(pageLocation['afficherTrajetsSuivants']);
            if (afficherTrajetsSuivants.length > 0) {
				await afficherTrajetsSuivants[0].click();
			} else {
				var continueLoop = false;
				var foundTrain = false;
			};
		};
	};
  
  	if (foundTrain) {

		const jeChoisis = await page.$x(pageLocation['jeChoisisCetAller']);
		await jeChoisis[0].click(); // find way to make this and below a single line
		

		const jeValide = await page.$x(pageLocation['jeValidePlacement']);
		await jeValide[0].click(); // find way to make this and below a single line


		const continuer1 = await page.$x(pageLocation['continuer1']);
		await continuer1[0].click(); // find way to make this and below a single line


		const continuer2 = await page.$x(pageLocation['continuer2']);
		await continuer2[0].click(); // find way to make this and below a single line


	};
  
	await browser.close();
})();
  
};