// const puppeteer = require('puppeteer');
// // const username = require('./creds').username;
// const username = 'ludmilaexbrayat@fb.com';
// const pw = 'Aut0matingM3#';

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
// const puppeteer = require('puppeteer');

const url = require('./pageInformation').url;
const pageLocation = require('./pageInformation').location;
const userInformation = require('./userInformation').information;

async function run () {

    // Step 1 - Opening Chromium and navigating to home page
    const browser = await puppeteer.launch({
      headless: false, // to see the steps in Chromium
      args: ['--start-maximized'] // to get Chromium maximised
    });
    const page = await browser.newPage();
    await page.goto(url);

    // // Step 2 - Close pop up for cookie
    // await page.waitFor(pageLocation['closeCookie']);
    // await page.click(pageLocation['closeCookie']);
    // console.log('Closed cookie');

    // // // Step 3 - Check if pop up for survey is visible
    // await page.waitFor(500);
    // const survey = await Promise.race([
    //   new Promise(resolve => setTimeout(() => resolve(), 200)), // resolves without value after 200ms
    //   page.waitForSelector(pageLocation['closeSurvey'], { visible: true })
    // ]);

    // if (survey) {
    //   await page.click(pageLocation['closeSurvey']);
    //   console.log('Closed survey');
    // }

    // // Step 4 - Start search
    // await page.waitFor(pageLocation['searchBox']);
    // await page.waitFor(500);
    // await page.type(pageLocation['searchBox'], userInformation['ArrivalStation']); 
    // console.log('Typed location');
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