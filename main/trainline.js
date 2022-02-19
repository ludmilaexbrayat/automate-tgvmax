// const puppeteer = require('puppeteer-extra')
// const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// puppeteer.use(StealthPlugin())
const puppeteer = require('puppeteer');

const url = require('./pageInformationTrainline').url;
const pageLocation = require('./pageInformationTrainline').location;
const userInformation = require('./userInformation').information;

async function run () {

    // Step 1 - Opening Chromium and navigating to home page
    const browser = await puppeteer.launch({
      headless: false, // to see the steps in Chromium
      args: ['--start-maximized'] // to get Chromium maximised
    });
    const page = await browser.newPage();
    await page.goto(url);

    // Step 2 - Close pop up for cookie
    await page.waitFor(pageLocation['closeCookie']);
    await page.click(pageLocation['closeCookie']);
    console.log('Closed cookie');

    // Step 3 - Start search
    await page.waitFor(pageLocation['searchTo']);
    await page.click(pageLocation['searchTo']);
    await page.waitFor(500);
    // await page.type(pageLocation['searchTo'], userInformation['departureStation']); 
    // console.log('Typed departure station');

    // await page.waitFor(pageLocation['searchFrom']);
    // // await page.waitFor(500);
    // await page.click(pageLocation['searchFrom']);
    // await page.type(pageLocation['searchFrom'], userInformation['arrivalStation']); 
    // console.log('Typed arrival station');
    // await page.waitFor(10000);

    // Step 5 - Check if pop up for survey is visible
    // if (survey) {
    //   await page.click(pageLocation['closeSurvey']);
    //   console.log('Closed survey');
    // }

    // await page.waitFor(pageLocation['launchSearch']);
    // await page.waitFor(500);
    // await page.click(pageLocation['launchSearch']);
    // console.log('Validated Search');

    // Step - Ending Chromium.
    
}

run();