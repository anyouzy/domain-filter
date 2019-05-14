const puppeteer = require('puppeteer');
const { expiredDomains } = require('../account');




class ExpiredDomains {

    async init() {
        this.cookie = '';
        this.dropdownSelector = '#saved-searches-menu';
        this.domainSelector = {
            org: '.dropdown-menu li:last-child',
            it: '.dropdown-menu li:nth-child(3)',
            nl: '.dropdown-menu li:nth-child(5)',
            be: '.dropdown-menu li:nth-child(6)',
        };
        this.browser = await puppeteer.launch({ headless: false });
        this.page = await this.browser.newPage();
    }

    async fetchbyPages(pages) {
        let domains = [];
        if (1 === pages) {
            domains = await this.page.$eval('.copyclipboard', e => e.getAttribute('data-clipboard-text').split('\n'));
            return domains;
        }

        for (let i = 0; i < pages; i++) {
            let thisPageDomain = await this.page.$eval('.copyclipboard', e => e.getAttribute('data-clipboard-text').split('\n'));
            domains.push(thisPageDomain);
            if (i === pages - 1) break;
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
                this.page.click('.next')
            ]);
        }
        /* 待测试 */
        console.log(domains.length);
        /* 待测试 */
        return domains;
    }

    async fetchDomain(domainType = 'org') {
        let domain = [];
        try {
            await this.init();
            await this.login();
            await this.page.waitForSelector(this.dropdownSelector);
            await this.page.click(this.dropdownSelector);
            await this.page.waitForResponse('https://member.expireddomains.net/savedsearches/menu/');
            await this.page.waitFor(2000);
            await this.page.waitForSelector(this.domainSelector[domainType]);
            await Promise.all([
                this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
                this.page.click(this.domainSelector[domainType])
            ]);
            /* 判断页面domain列表是否为空 */
            let noDomain = await this.page.$eval('.base1', e => e.rows[1].cells[0].innerHTML === 'no Domains found');
            if (noDomain) return [];
            /* 计算页数 */
            let pages = await this.page.$eval('.infos > strong:nth-child(2)', e => Math.ceil(Number.parseInt(e.innerText) / 200));
            domain = await this.fetchbyPages(pages);

        } catch (e) {
            console.error(e);
        }

        await this.browser.close();
        return domain;
    }

    async login() {
        try {
            await this.page.goto('https://member.expireddomains.net/');
            let content = await this.page.content();
            if (content.match(/<title>Login<\/title>/)) {
                await this.page.waitForSelector('#inputLogin');
                await this.page.type('#inputLogin', expiredDomains.user);
                await this.page.type('#inputPassword', expiredDomains.pass);
                await this.page.evaluate(() => {
                    document.querySelectorAll('[type=submit]')[1].id = 'loginnow';
                });

                await Promise.all([
                    this.page.waitForNavigation(),
                    this.page.click('#loginnow')
                ]);

            }
        } catch (e) {
            console.error(e.message);
        }
    }


}





module.exports = {
    ExpiredDomains
}