const puppeteer = require('puppeteer');
const {
    expiredDomains
} = require('../account');



class ExpiredDomains {

    async fetch(pageCount = 1) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let sourceDomainList = [];

        let selector = '[data-clipboard-text]';
        for (let i = 0; i < pageCount; i++) {
            let url = `https://member.expireddomains.net/domains/combinedexpired/?start=${i*200}&savedsearch_id=172460&flast12=1&flast24=1&fabirth_year=2016&flimit=200&fmaxhost=25&fconsephost=1&fbl=10&facr=10&fprice=60&fwhois=22&o=changes&r=a`;

            try {
                await page.setUserAgent(expiredDomains.userAgent);
                await page.setCookie(expiredDomains.cookies.ExpiredDomainssessid, expiredDomains.cookies.reme);
                await page.goto(url);
                await page.waitForSelector(selector);
                let domains = await page.evaluate(() => {

                    let tmpDomains = document.querySelector('[data-clipboard-text]').getAttribute('data-clipboard-text').split('\n');
                    tmpDomains.pop();
                    return tmpDomains.filter(domain => !domain.includes('.gov.cn'));
                });
                sourceDomainList = sourceDomainList.concat(domains);

            } catch (e) {
                console.error(e.message);
            }
        }

        await browser.close();

        return sourceDomainList;

    }

}


module.exports = {
    ExpiredDomains
}