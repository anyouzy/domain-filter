//const sleep = require('sleep-promise');
const { Google } = require('./lib/Google');
const { WebArchive } = require('./lib/WebArchive');
const { Mail } = require('./lib/Mail');
const { DomainAvailable } = require('./lib/DomainAvailable');
const { ExpiredDomains } = require('./lib/ExpiredDomains');



(async () => {
    let checkList = [];
    /* //命令行参数验证  -t=org   -t=be
    if (!process.argv[2]) {
        console.log('未提供域名类型');
        return;
    }
    let domainType = process.argv[2].substring(3, process.argv[2].length);

    //从expireddomains.net获取域名列表

    let sourceDomainList = await new ExpiredDomains().fetchDomain(domainType);

    if (!sourceDomainList.length) return; */


    let sourceDomainList = [];


    // 过滤在godday not available的域名
    let {
        availableDomainList,
        availablePrices
    } = await (new DomainAvailable()).check(sourceDomainList);

    if (!availableDomainList.length) return;


    //过滤没有google index或者index大于120的域名
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


    }
    if (!checkList.length) return;

    (new Mail()).assignTask(checkList);



})();



