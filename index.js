const sleep = require('sleep-promise');
const { Google } = require('./lib/Google');
const { WebArchive } = require('./lib/WebArchive');
const { Mail } = require('./lib/Mail');
/* 
域名列表
是否可以购买 
index在 0-200
有没有archive数据
连续年数是多少
redirect数量
*/



let domainList = [
    'lindentapijten.nl',
    'elisaf.nl',
    'fietsenverhuurdespar.nl',
    'funbugxter.nl',
    'Make-Things-Happen.nl',
    'loblanboots.nl',
    'detuinwinkelgouda.nl',
    'GarageVanDorp.nl',
    'drijversvastgoed.nl',
    'hermansschilderwerk.nl',
    'flevoglas.nl',
    'MarketingMeasurement.nl',
    'GoldNames.nl',
    'lsjmp.nl',
    'kubidak.nl',
    'HeliosManagement.nl',
    'MetaCamHome.nl',
    'emteetholen.nl',
    'hoefsmidgert.nl',
    'darm-probleme.at',
    'goyencommunicatie.nl',
    'mafador.nl',
    'HeavenHell.at',
    'Dog-Fit-Vital.at',
    'culiwijn.nl',
    'la-consult.nl',
    'korkboeden.at',
    'eseba.at',
    'downloadz.at',
    'mima-archeologie.nl',
    'LagOmar.nl',
    'innovationshaus.at',
    'kuypers-mol.nl',
    'GirlPagina.nl',
    'TransWay.aero',
    'dbzplanontwikkeling.nl',
    'ElectroGrow.nl',
];



let checkList = [];

async function main() {
    //获取域名列表----待完成

    for (let i = 0, len = domainList.length; i < len; i++) {
        let domain = domainList[i];
        //是否available --- 待完成

        //google index数量小于5或者大于200的跳过
        let gIndex = await (new Google(domain)).getIndex();
        if (typeof (gIndex) === 'number' && (gIndex > 200 || gIndex < 5)) continue;


        let webArchive = new WebArchive(domain);
        let hasArchiveInfo = await webArchive.hasArchiveInfo();
        //没有webarchive数据的跳过
        if (!hasArchiveInfo) continue;


        //连续年数小于3的跳过
        let continuousYears = webArchive.getContinuousYears();
        if (continuousYears < 3) continue;


        //最后一年跳转超过5次跳过
        let crawlInfo = await webArchive.getCrawlInfo();
        if (crawlInfo[crawlInfo.length - 1].redirect > 5) continue;

        checkList.push({
            domain,
            gIndex,
            continuousYears,
            crawlInfo
        });
        /* console.log('暂停中');
        await sleep(30000);
        console.log('继续'); */
    }

    if (!checkList.length) return;
    (new Mail()).send(checkList);

}


main();