const puppeteer = require('puppeteer');
const {
    expiredDomains
} = require('../account');



class ExpiredDomains {

    async login() {
        this.browser = await puppeteer.launch();
        const page = await this.browser.newPage();
        await page.goto('https://www.expireddomains.net/login/');
        await page.waitForSelector('#inputLogin');
        await page.type('#inputLogin', expiredDomains.user);
        await page.type('#inputPassword', expiredDomains.pass);
        await page.click('#rememberme');
        await page.evaluate(() => {
            document.querySelectorAll('[type=submit]')[1].id = 'loginnow';
        });
        await page.click('#loginnow');
        return page;
    }

    async fetch(pageCount = 1) {

        //const page = await this.login();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
        await page.goto('https://www.expireddomains.net/login/');
        await page.waitForSelector('#inputLogin');
        await page.type('#inputLogin', expiredDomains.user);
        await page.type('#inputPassword', expiredDomains.pass);
        await page.click('#rememberme');
        await page.evaluate(() => {
            document.querySelectorAll('[type=submit]')[1].id = 'loginnow';
        });
        await page.click('#loginnow');



        let sourceDomainList = [];

        let selector = '[data-clipboard-text]';

        for (let i = 0; i < pageCount; i++) {
            let url = `https://member.expireddomains.net/domains/combinedexpired/?start=${i * 200}&savedsearch_id=172543&flast12=1&flast24=1&fabirth_year=2016&flimit=200&fmaxhost=25&fconsephost=1&fbl=10&facr=10&fprice=60&fwhois=22&o=changes&r=d`;

            try {
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
                await page.setCookie(expiredDomains.cookies.ExpiredDomainssessid, expiredDomains.cookies.reme);
                await page.goto(url);
                let content = await page.content();
                console.log(content);
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

        await page.goto('https://member.expireddomains.net/logout/');

        await browser.close();

        return sourceDomainList;

    }

}


module.exports = {
    ExpiredDomains
}