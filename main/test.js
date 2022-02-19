// const puppeteer = require('puppeteer');
// // const username = require('./creds').username;
// const username = 'ludmilaexbrayat@fb.com';
// const pw = 'Aut0matingM3#';

const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
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

    // Step 2 - Close pop ups
    await page.waitFor(pageLocation['closeCookie']);
    await page.click(pageLocation['closeCookie']);
    console.log('Closed cookie');

    // await page.waitFor(pageLocation['closeSurvey']); // /!\ This pop up shouldn't always show up. To be set as optional.
    // await page.click(pageLocation['closeSurvey']);
    // console.log('Closed survey');

    // Step 3 - Start search
    await page.waitFor(pageLocation['searchBox']);
    await page.type(pageLocation['searchBox'], userInformation['ArrivalStation']); 
    console.log('Typed location');
    await page.waitForTimeout(5000);

    await page.click(pageLocation['launchSearch']);
    console.log('Validated Search');

    // Step - Ending Chromium.
    
}

run();