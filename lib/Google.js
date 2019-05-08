const puppeteer = require('puppeteer');
const sleep = require('sleep-promise');


class Google {

    constructor() {
        this.regs = {
            indexCnt: /id="resultStats">(?:About\s)?(.*?)\sresults?/,
            noIndex: /did not match any documents/,
            banned: /you sending the requests, and not a robot/,
        };
        this.maxIndex = 120;
        this.extensionDir = 'C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Default/Extensions/mpbjkejclgfgadiemmefgebjfooflfhl/0.5.2_0';
    }

    async filterByIndex(domainList, prices) {

        const browser = await puppeteer.launch({
            headless: false,
            args: [
                `--disable-extensions-except=${this.extensionDir}`,
                `--load-extension=${this.extensionDir}`
            ]
        });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');

        let data = {
            domainList: [],
            indexCnts: [],
            prices: []
        };

        for (let i = 0, len = domainList.length; i < len; i++) {

            let domain = domainList[i];
            let param = encodeURIComponent('site:' + domain);
            let url = `https://www.google.com/search?q=${param}&oq=${param}&sourceid=chrome&ie=UTF-8`;
            let content = '';

            try {
                await Promise.all([
                    page.goto(url),
                    page.waitForNavigation()
                ]);
                await page.waitForSelector('#resultStats');
                content = await page.content();
            } catch (e) {
                console.error(e.message);
                data.domainList.push(domain);
                data.indexCnts.push('网络错误');
                data.prices.push(prices[i]);
                continue;
            }

            if (content.match(this.regs.banned)) {

                console.log('banned');



                /* const frame = await page.frames().find(f => f.url().includes('https://www.google.com/recaptcha/api2/anchor'));
                let target = await frame.$('.rc-inline-block');
                
                await target.click({button:'middle',delay:'30'}); */

                /* await sleep(20000);
				await page.waitForNavigation();
				content = await page.content();
                console.log(content); */
                /*await Promise.all([
                    page.waitForNavigation(),
					frame.evaluate(target=>{target.click()},target)
                ]);*/
                // await frame.click('.recaptcha-checkbox-checkmark');


                data.domainList.push(domain);
                data.indexCnts.push('被google验证码拦截');
                data.prices.push(prices[i]);
                continue;
            }

            if (content.match(this.regs.noIndex)) continue;

            let indexCnt = Number.parseInt(content.match(this.regs.indexCnt)[1].replace(/,/g, ''));

            if (indexCnt > this.maxIndex) continue;

            data.domainList.push(domain);
            data.indexCnts.push(indexCnt);
            data.prices.push(prices[i]);

        }

        await browser.close();

        return data;
    }

}


module.exports = {
    Google
};









/*
 const HttpsProxyAgent = require('https-proxy-agent');
const fetch = require('node-fetch');
class Google {
    constructor(domain) {
        this.domain = domain;
        this.regs = {
            indexCnt: /id="resultStats">(?:About\s)?(.*?)\sresults?/,
            noIndex: /did not match any documents/,
            banned: /you sending the requests, and not a robot/,
        };
        this.requestURL = this.getRequestURL();
        this.agent = HttpsProxyAgent('http://127.0.0.1:1080');
    }
    getRequestURL() {
        let param = encodeURIComponent('site:' + this.domain);
        return `https://www.google.com/search?q=${param}&oq=${param}&sourceid=chrome&ie=UTF-8`;
    }

    async getIndex() {
        try {
            let res = await fetch(this.requestURL);
            let html = await res.text();

            if (html.match(this.regs.banned)) return '被google验证码拦截';

            if (html.match(this.regs.noIndex)) return 0;

            let indexCnt = Number.parseInt(html.match(this.regs.indexCnt)[1].replace(/,/g, ''));

            return indexCnt;

        } catch (e) {
            console.log(e.message);
            return '网络错误';
        }

    }
} */