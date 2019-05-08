//const sleep = require('sleep-promise');
const {
    Google
} = require('./lib/Google');
const {
    WebArchive
} = require('./lib/WebArchive');
const {
    Mail
} = require('./lib/Mail');
const {
    DomainAvailable
} = require('./lib/DomainAvailable');

/* let sourceDomainList = [
    'LuminousLive.be',
    'wallonie-celtique.be',
    'VivaMinerva.be',

]; */


let availableDomainList = [
    'LuminousLive.be',

]
let checkList = [];



async function main() {


    //获取域名列表----待完成

    // 过滤在godday not available的域名
   /*  let {
        availableDomainList,
        availablePrices
    } = await (new DomainAvailable()).check(sourceDomainList);

    if (!availableDomainList.length) return; */
    let availablePrices = []

    //过滤没有google index或者index大于120的域名
    let {
        domainList,
        indexCnts,
        prices
    } = await (new Google()).filterByIndex(availableDomainList, availablePrices);

    return;
    if (!domainList.length) return;

    //webarchive过滤
    for (let i = 0, len = domainList.length; i < len; i++) {
        let domain = domainList[i];

        let webArchive = new WebArchive(domain);
        let hasLatestArchiveInfo = await webArchive.hasLatestArchiveInfo();
        //近期没有抓取记录的过滤掉
        if (false === hasLatestArchiveInfo) continue;


        //连续年数小于3的跳过
        let continuousYears = webArchive.getContinuousYears();
        if (continuousYears < 3) continue;


        //最后一年跳转超过5次跳过
        let crawlInfo = await webArchive.getCrawlInfo();
        let redirectCnt = crawlInfo[crawlInfo.length - 1].redirect;
        if (typeof (redirectCnt) === 'number' && redirectCnt > 5) continue;


        checkList.push({
            domain,
            price: prices[i],
            indexCnt: indexCnts[i],
            continuousYears,
            crawlInfo,
        });

        //await sleep(10000);

    }
    if (!checkList.length) return;

    (new Mail()).assignTask(checkList);

}

main();