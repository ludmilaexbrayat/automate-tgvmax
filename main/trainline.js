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
    // await page.waitFor(pageLocation['searchTo']);
    // await page.click(pageLocation['searchTo']);
    // await page.type(pageLocation['searchTo'], userInformation['departureStation']); 
    // console.log('Typed departure station');

    // await page.waitFor(pageLocation['searchFrom']);
    // await page.click(pageLocation['searchFrom']);
    // await page.type(pageLocation['searchFrom'], userInformation['arrivalStation']); 
    // console.log('Typed arrival station');

    // Scroll down half the page
    await page.evaluate( () => {
                window.scrollBy(0, 0.5 * window.innerHeight);
            }); // Should do a loop
    console.log('Scrolled down the page');
    
    // await page.focus(pageLocation['searchDate']);
    // await page.type(pageLocation['searchFrom'], '20220220');
    // await page.waitFor(pageLocation['searchDate']);
    // await page.click(pageLocation['searchDate']);
    // await page.waitFor(pageLocation['pickDate']);
    // await page.click(pageLocation['pickDate']);
    await page.waitFor('#cdf2b882-e71a-4648-bf9f-63004acb0ed2');
    console.log('found it')
    await page.select('#cdf2b882-e71a-4648-bf9f-63004acb0ed2', '08');
    // await page.click(pageLocation['searchHour']);
    // await page.type(pageLocation['searchHour'], '08'); 
    console.log('Typed arrival station');

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