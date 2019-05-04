const puppeteer = require('puppeteer');

const {
    ExpiredDomains
} = require('./lib/ExpiredDomains');
const {
    Mail
} = require('./lib/Mail');

const {
    checkThisDomain
} = require('./lib');





(async () => {

    let sourceDomainList = await new ExpiredDomains().fetch();
    if (!sourceDomainList.length) return;

    const browser = await puppeteer.launch();
    let checkList = [];
    let checkCnt = 0;


    for (let i = 0, len = sourceDomainList.length; i < len; i++) {

        let domain = sourceDomainList[i];

        checkThisDomain(browser, domain)
            .then(async (data) => {
                checkCnt++;
                if (data.shouldInCheckList) checkList.push(data);
                if (checkCnt === len) {
                    await browser.close();
                    if (!checkList.length) return;
                    (new Mail()).send(checkList);
                }
            });
    }
})();