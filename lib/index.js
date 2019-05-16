const sleep = require('sleep-promise');
const { Google } = require('./Google');
const { WebArchive } = require('./WebArchive');
const { Mail } = require('./Mail');
const { DomainAvailable } = require('./DomainAvailable');
const { ExpiredDomains } = require('./ExpiredDomains');





async function fetchAndFilter(domainType) {

    //从expireddomains.net获取域名列表

    let allDomains = await new ExpiredDomains().fetchDomain(domainType);

    if (!allDomains.length) return;



    /* 每批检查100个，暂停一会, 再检查下100个 */
    let count = 100;
    for (let j = 0, len = Math.ceil(allDomains.length / count); j < len; j++) {

        let startIndex = j * count;
        let endIndex = ((j + 1) === len) ? allDomains.length : (j + 1) * count;
        console.log(startIndex, endIndex);
        let sourceDomainList = allDomains.slice(startIndex, endIndex);
        let checkList = [];


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


            //获取抓取状态中的redirect(3xx),error(5xx)，并过滤最后一年redirect超过5次的域名
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

        if (len === 1) return;

        await sleep(1000 * 60 * 10);//暂停10分钟

    }

}



module.exports = {
    fetchAndFilter
}


