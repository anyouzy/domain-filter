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


let sourceDomainList = [
    'zamaneh.tv',
    'lucaspesso.it',
    'calcolaratafinanziamento.it',
    'louis-vuitton-handbags.cc',
    'ManaGore.es',
    'edelpark-immobilien.de',
    'KatherineMarie.me',
    'nwn2-worlds.de',
    'c2k-gaming.de',
    'GlobIsh.me',
    'ShadowItAlia.it',
    'SiteInfo.es',
    'antakyabelediye.tv',
    'veronaoggi.tv',
    'brf-hus3.se',
    'daab.es',
    'drukujemy.co.uk',
    'perepelitsa.com.ua',
    'lickwh.at',
    'PureDerm.cz',
    'Squished.me',
    'ogloszeniaradymno.pl',
    'Wildness.me',
    'riuglass.it',
    'fortet.no',
    'HammamBalkis.it',
    'MonkIng.es',
    'JoeReadParkour.co.uk',
    'tlog.ro',
    'dfds-baltikum.de',
    'CeciliaHolidays.it',
    'njdynamic.co.uk',
    'Dari.es',
    'Sex-Live.se',
    'moku24.de',
    'schwanenbuehne.ch',
    'jobs-in-kingston.co.uk',
    'tface.me',
    'BusinessBreakthroughEvent.co.uk',
    'finlandia.org.es',
    'carmeloparrinelli.it',
    'Salto-Regensburg.de',
    'Nike2015.com.tw',
    'estudio81.es',
    'findachristian.co.uk',
    'Pastiche.mx',
    'itd-euken.de',
    'FreeTalk.com.hk',
    'ostrava-educanet.cz',
    'centruldesanatateintima.ro',
    'partyservislida.cz',
    'steingruber-aidenried.de',
    'marketwi.se',
    'degerleme.tv',
    'bertip.cz',
    'maspropiedades.mx',
    'jornalpresente.pt',
    'kikohernandez.es',
    'Tournois-Legend.fr',
    'likr.es',
    'BabyPlaza.com.ua',
    'lanparty-minden.de',
    'SkipBinHiResolutions.com.au',
    'immobilcuneo.it',
    'AbcKinder.es',
    'Pipe-Line.it',
    'genitorisulserio.it',
    'zczalabi.cz',
    'baselito.it',
    'af-1.com.tw',
    'mudanzasnacionalesmadrid.com.es',
    'rignanofly.it',
    'MyChat.tw',
    'RefCast.pt',
    'umal.me',
    'radioriks.no',
    'TimeList.me',
    'museobuap.mx',
    'veovisiones.es',
    'LotsOf.me',
    'OscarRoofing.co.uk',
    'ck-babicka.cz',
    'dearmarios.es',
    'thietkeweb.me',
    'trecer.it',
    'sarkazmer.pl',
    'dentourrejser.dk',
    'bauen-in-oelde.de',
    'superfotbal.ro',
    'Bibulous.me',
    'SalaRoxy.es',
    'klodkowski.pl',
    'WiggleLess.cz',
    'BestWishesDoncaster.co.uk',
    'MobilesMania.co.uk',
    'MadRiceCastroNovo.it',
    'GamingDeals.co.uk',
    'DualWebs.pt',
    'iqy.so',
    'medtechprisen.no',


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

        //await sleep(10000);

    }
    if (!checkList.length) return;

    (new Mail()).assignTask(checkList);

}

main();