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
        return `https://www.google.com/search?q=${param}&oq=${param}sourceid=chrome&ie=UTF-8`;
    }

    async getIndex() {
        try {
            let res = await fetch(this.requestURL, { agent: this.agent });
            let html = await res.text();

            if (html.match(this.regs.banned)) return '被google验证码拦截';

            if (html.match(this.regs.noIndex)) return 0;

            let indexCnt = Number.parseInt(html.match(this.regs.indexCnt)[1].replace(/,/g, ''));

            return indexCnt;

        } catch (e) {
            console.log(e.message);
        }

    }
}

module.exports = { Google };














