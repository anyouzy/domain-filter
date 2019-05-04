const sleep = require('sleep-promise');
const {
    Google
} = require('./Google');
const {
    WebArchive
} = require('./WebArchive');
const {
    Mail
} = require('./Mail');
const {
    DomainAvailable
} = require('./DomainAvailable');

let sourceDomainList = [
    'schuurmachinewebshop.be',
    'marche-de-printemps-my.be',
    'bijverdienste-antwerpen.be',
    'webshopaanmelden.be',
    'ariedefijter.be',
    'InnerBranding.be',
    'cdhgerpinnes.be',
    'MannaVitaShop.be',
    'ekkotic.be',
    'ininup.be',
    'icarelab.be',
    'SolomonCole.be',
    'duranschrijnwerk.be',
    'curosoft.be',
    'doelgerichttrainen.be',
    'India-CityTrips.be',
    'floramedicina.be',
    'nieuweinwoners.be',
    'terras-aanleg.be',
    'faradji.be',
    'citiminers.be',
    'openbedrijf.be',
    'deinterieurspecialisten.be',
    'WeCanSee.be',
    'DiamondSport.be',


];

let checkList = [];



async function main() {


    //获取域名列表----待完成

    // 过滤在godday not available的域名
    let {
        availableDomainList,
        availablePrices
    } = await (new DomainAvailable()).check(sourceDomainList);

    if (!availableDomainList.length) return;


    //过滤google index数量小于3或者大于200的域名
    let {
        domainList,
        indexCnts,
        prices
    } = await (new Google()).filterByIndex(availableDomainList, availablePrices);


    if (!domainList.length) return;



    //webarchive过滤
    for (let i = 0, len = domainList.length; i < len; i++) {
        let domain = domainList[i];

        let webArchive = new WebArchive(domain);
        let hasArchiveInfo = await webArchive.hasArchiveInfo();
        //没有webarchive数据的跳过
        if (false === hasArchiveInfo) continue;


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

    (new Mail()).send(checkList);



}


main();