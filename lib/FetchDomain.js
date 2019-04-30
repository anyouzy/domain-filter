
const puppeteer = require('puppeteer');
const { expiredDomains } = require('../account');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.expireddomains.net/login/');

    await page.waitForSelector('#inputLogin');
    await page.waitForSelector('#inputPassword');

    await page.type('#inputLogin', expiredDomains.user);
    await page.type('#inputPassword', expiredDomains.pass);

    await page.click('#rememberme');

    await page.evaluate(() => {
        document.querySelectorAll('button[type="submit"]')[1].id = 'login';
    });

    await page.click('#login');
    //https://member.expireddomains.net/domains/combinedexpired/?savedsearch_id=171390&flast12=1&flast24=1&fabirth_year=2016&flimit=200&fmaxhost=20&fconsephost=1&facr=10&fmaxnumbercount=2&fprice=100&fwhois=22&o=aentries&r=d
    //https://member.expireddomains.net/domains/expiredorg/?savedsearch_id=171431&flast24=1&fabirth_year=2014&flimit=25&fnumhost=1&facr=30&fwhois=22
    await page.goto('https://member.expireddomains.net/domains/expiredorg/?savedsearch_id=171431&flast24=1&fabirth_year=2014&flimit=25&fnumhost=1&facr=30&fwhois=22');


    let content = await page.content();

    await browser.close();
})();
