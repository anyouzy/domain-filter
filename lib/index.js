

const {
    Google
} = require('./Google');

const {
    WebArchive
} = require('./WebArchive');




async function checkThisDomain(browser, domain) {


    let indexCnt = await new Google().getIndexCnt(browser, domain);
    console.log(domain + ':' + indexCnt);
    if (-1 === indexCnt) return {
        shouldInCheckList: false
    };

    let webArchive = new WebArchive(domain);
    let hasArchiveInfo = await webArchive.hasArchiveInfo();
    if (false === hasArchiveInfo) return {
        shouldInCheckList: false
    };


    let continuousYears = webArchive.getContinuousYears();
    if (continuousYears < 3) return {
        shouldInCheckList: false
    };


    let crawlInfo = await webArchive.getCrawlInfo();
    let redirectCnt = crawlInfo[crawlInfo.length - 1].redirect;
    if (typeof (redirectCnt) === 'number' && redirectCnt > 5) return {
        shouldInCheckList: false
    };


    return {
        shouldInCheckList: true,
        domain,
        indexCnt,
        continuousYears,
        crawlInfo
    }

}


module.exports = {
    checkThisDomain
}