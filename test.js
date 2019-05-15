const puppeteer = require('puppeteer');

(async () => {
    const username = '';
    const password = '';

   try {
       const browser = await puppeteer.launch({
           headless: false,
           'args': [
               '--proxy-server=117.196.232.144:30716'
           ]
       });

       const page = await browser.newPage();
       await page.goto('https://www.google.com/search?q=site%3Azopodeals.com');
    // await page.authenticate({ username, password });

    //await page.goto('https://www.example.com/');

    //await browser.close();
   } catch (error) {
       console.log(error)
   }
})();