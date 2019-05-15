const puppeteer = require('puppeteer');
const sleep = require('sleep-promise');


class Google {

    constructor() {
        this.regs = {
            indexCnt: /id="resultStats">(?:About\s)?(.*?)\sresults?/,
            noIndex: /did not match any documents/,
            banned: /you sending the requests, and not a robot/,
            parked: /This web page is parked FREE/i,
        };
        this.maxIndex = 120;
    }

    async filterByIndex(domainList, prices) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

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
                await page.goto(url);
                content = await page.content();
            } catch (e) {
                console.error('google index filter error: ' + e.message);
                data.domainList.push(domain);
                data.indexCnts.push('网络错误');
                data.prices.push(prices[i]);
                continue;
            }

            if (content.match(this.regs.banned)) {

                data.domainList.push(domain);
                data.indexCnts.push('被google验证码拦截');
                data.prices.push(prices[i]);
                continue;
            }

            if (content.match(this.regs.noIndex)) continue;

            if (content.match(this.regs.parked)) continue;

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




 const browser = await puppeteer.launch({
            headless: false,
            args: [
                `--disable-extensions-except=${this.extensionDir}`,
                `--load-extension=${this.extensionDir}`
            ]
        });



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