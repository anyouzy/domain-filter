class Google {

    constructor() {
        this.regs = {
            indexCnt: /id="resultStats">(?:About\s)?(.*?)\sresults?/,
            noIndex: /did not match any documents/,
            banned: /you sending the requests, and not a robot/,
        };
        this.minIndex = 3;
        this.maxIndex = 200;
    }

    async getIndexCnt(browser, domain) {

        const page = await browser.newPage();

        let param = encodeURIComponent('site:' + domain);
        let url = `https://www.google.com/search?q=${param}&oq=${param}&sourceid=chrome&ie=UTF-8&t=${Date.now()}`;
        let content = '';

        try {
            await page.goto(url);
            content = await page.content();
        } catch (e) {
            console.error(e.message);
            return '网络错误';
        }

        //await page.close();
        if (content.match(this.regs.banned)) {
            await page.evaluate(() => {
                document.querySelector('.recaptcha-checkbox-checkmark').click();
            });
            content = await page.content();
           / * return '被google验证码拦截'; * /
        }

        let indexCnt = content.match(this.regs.noIndex) ? 0 : Number.parseInt(content.match(this.regs.indexCnt)[1].replace(/,/g, ''));

        if (indexCnt < this.minIndex || indexCnt > this.maxIndex) return -1;

        return indexCnt;

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