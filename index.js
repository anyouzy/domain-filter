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
    'LuminousLive.be',
    'wallonie-celtique.be',
    'VivaMinerva.be',
    'av-forever.be',
    'prive-emmanuelle.be',
    'xetara.be',
    'atrconstruct.be',
    'properelucht.be',
    'institut-taisnier.be',
    'geldverdienen-online.be',
    'LegrandChemin.be',
    'MarionHansel.be',
    'cafeschuttershof.be',
    'CitizenGuard.be',
    'beeldcomplot.be',
    'ChickFight.be',
    'platformcultuurlimburg.be',
    'VillaCatalpa.be',
    'vandebontemorgen.be',
    'Song-Of-Hiawatha.be',
    'Iron-Gym.be',
    'gevelwerken-vergelijken.be',
    'visionbydeloitte.be',
    'houtmeubel.be',
    'vds-concepts.be',
    'jacobz.be',
    'danklub.be',
    'wisfaq.be',
    'Iranians.be',
    'MagicoWebDesign.be',
    'academie-info.be',
    'ZeroToNine.be',
    'BorderCollieSite.be',
    'SecTrack.be',
    'SearchUniversity.be',
    'ChookDee.be',
    'Brussels-International.be',
    'webjournalistiek.be',
    'FromHouseHerTog.be',
    'ConventionGamePlay.be',
    'CoolCoups.be',
    'TanDartSinHasselt.be',
    'sint-jacobshuys.be',
    'sespetitsriens.be',
    'gay4u.be',
    'MarathonVanLier.be',
    'sliksletjes.be',
    'gvga.be',
    'PastOpole.be',
    'MisterBelgiumPersonality.be',
    'SupersonicFestival.be',
    'galaccb.be',
    'DikeOn.be',
    'TrikeFriends.be',
    'Studio-Sept.be',
    'SalonsDumontCarmel.be',
    'becauseimagirl.be',
    'jeugdpact.be',
    'ilestpartitropvite.be',
    'PizzaGusto.be',
    'sodirep.be',
    'fautlefaire.be',
    'GrainedAmour.be',
    'RevGeoGate.be',
    'vrmrapporten.be',
    'domusbrugensis.be',
    'SuperHappy.be',
    'ParCoursVisit.be',
    'OlympicLanden.be',
    'CartoonBox.be',
    'Ashram.be',
    'mahdia.be',
    'whoost.be',
    'ged-archivage.be',
    'vanhetmanneke.be',
    'EcoSpanning.be',
    'vzwcoma.be',
    'Milo-Events.be',
    'matsici.be',
    'happifish.be',
    'SoBasic.be',
    'pakaan.be',
    'NorTom-Computing.be',
    'bdirectory.be',
    'NewHaven.be',
    'House-Of-Harley.be',
    'paradou.be',
    'deeltijdsonderwijs-kempen.be',
    'apdm.be',
    'OpenSchoolInfo.be',
    'dienamis.be',
    'JesuIsFantastic.be',
    'vzwkiko.be',
    'Cattery-Alturas.be',
    'lesartichautsretro.be',
    'versvandebakker.be',
    'keuken-renoveren.be',
    'derdewereldraad.be',
    'denlavaar.be',
    'GoldenShower.be',
    'TheKidsParadise.be',
    'piknikelektronik.be',
    'hd-pornofilm.be',
    'ilgambero.be',
    'CatteryBeautifulPearl.be',
    'borderlinepb.be',
    'leaudelure.be',
    'dekrieckaert.be',
    'noordzeetexas.be',
    'erfgoedcelkortrijk.be',
    'gusta-antwerpen.be',
    'verzekeringskantoormol.be',
    'oterrasses.be',
    'ilkavermeiren.be',
    '2014Sochi.be',
    '123mobielinternet.be',
    'leonwalry.be',
    'NivellesCommerces.be',
    'otoclubje.be',
    'serdem.be',
    'vwjl.be',
    'erfgoedcelterf.be',
    'frederic-ivanko.be',
    'TrafficMeter.be',
    'linksuggestie.be',
    'brucovo.be',
    'ThinkFuture.be',
    'PlanYourEscape.be',


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