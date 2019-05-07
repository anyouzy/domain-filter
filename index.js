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
    'pyinoolwin.org',
    'TheAlternativeMedicine.org',
    'ansaeba.org',
    '23aprel.org',
    'TopZero.org',
    'hvo-bad-steben.org',
    'wvfurs.org',
    'LatinFaces.org',
    'Sign4FemaleCondoms.org',
    'NeverendingArt.org',
    'poytner.org',
    'grgg.org',
    'BuildingGamesOnline.org',
    'HightechJobs.org',
    'russkoeveche.org',
    'CasinoGameStop.org',
    'revolutas.org',
    'AwarenessRibbon.org',
    'OrgSoftCom.org',
    'lhc8.org',
    'aafhe.org',
    'adevalles.org',
    'lafabbrica.org',
    'AmmaCroatia.org',
  /*   'makosh.org',
    'thaidhamma.org',
    'in-medias-res.org',
    'may29th.org',
    'euromab.org',
    'fondazionenovalia.org',
    'staggpac.org',
    'poetreecreations.org',
    'AccaFlorida.org',
    'SalvationArmyAntigua.org',
    'NatureOfReality.org',
    'ChangeBucket.org',
    'moda2016.org',
    'Innovation-Studio.org',
    'latinfe.org',
    'reztemplechurch.org',
    'klirosi.org',
    'DesertViewDental.org',
    'AntiCholesterol.org',
    'GenerationDevelopment.org',
    'HillbillyHaiku.org',
    'UniversityOfHargeisa.org',
    'stlukesrak.org',
    'duygusal.org',
    'AtRoche.org',
    'reweon.org',
    'RotaryDoctorBank.org',
    'RobotMenAger.org',
    'bahedc.org',
    'ChakraTantraTemple.org',
    'TheScienceRoom.org',
    'sanfrancisco2013.org',
    'bilet-avion.org',
    'HabitatRome.org',
    'koinema.org',
    'ashlandymcaoh.org',
    'wapainc.org',
    'NetSnow.org',
    'HideSeek.org',
    'BlueFrost.org',
    'stadsvernieuwing.org',
    'FamilyAidsCoalition.org',
    'bobwilsonmemorial.org',
    'NeufLow.org',
    'Meadowlarks.org',
    'IranPolicyCommittee.org',
    'dolstyle.org',
    'AndHist.org',
    'FilmUs.org',
    'LetterToObama.org',
    'SlapCancer.org',
    'olejlniany.org',
    'MidwestOrganic.org',
    'Bit0.org',
    'ArtistsForumWorkshop.org',
    'HomeTheaterSetup.org',
    'oinori.org',
    'IceCrown.org',
    'CelebrityChef.org',
    'daizucms.org',
    'dnatestingcost.org',
    'rejuca.org',
    'info-anons.org',
    'mthopelearningcenter.org',
    'dosar.org',
    'DefendingWisconsin.org',
    'fundacionangelesalrescate.org',
    'ItalianFilmFestival.org',
    'VideoHotel.org',
    'nirogilanka.org',
    'AdPort.org',
    'cvrdc.org',
    'nwnhs.org',
    'ArizonaAttorney.org',
    'DrupalDojo.org',
    'sdmedical.org',
    'sierraclub-nc.org',
    'ealm.org',
    'Himp3.org',
    'FlightBook.org',
    'copma.org',
    'almazclub.org',
    'DarienYouthFieldHockey.org',
    'ciodep.org',
    'ThePowerOfIllusion.org',
    'TaylorJames.org',
    'SolarRoofTiles.org',
    'gbc-orangeva.org',
    'HumanRightsBudgetWork.org',
    'MediaTecAroma.org',
    'lincolncountyema.org',
    'RestoreEmail.org',
    'dapurqq.org',
    'naughtystepbdd.org',
    'btclend.org',
    'ww1archaeology.org',
    'UniteForPublicServices.org',
    'CreditRepairKits.org',
    'ArchIcon.org',
    'nsbepax.org',
    'reactiv.org',
    'CanoeKayakSable.org',
    'Swine-Flu.org',
    'xjobs.org',
    'HooverFirst.org',
    'Gauche2012.org',
    '11a.org',
    'SpragueBrothers.org',
    'CalmTheBasin.org',
    'SartOnline.org',
    'nnvsdiasporanigerians.org',
    'wecu2.org',
    'HeartCoaching.org',
    'JustTen.org',
    'theopolis.org',
    'langtu.org',
    'lrgwateroflife.org',
    'GraduateStudentCaucus.org',
    'guijia.org',
    'whidbeymonks.org',
    'odnowa-coventry.org',
    'xi2.org',
    'Link8.org',
    'tpark.org',
    'StayUndesirable.org',
    'Pro-International.org',
    'ImperialCoin.org',
    'asysokak.org',
    'Americans-By-Choice.org',
    'OklahomaJazz.org',
    'SeoCompanyDelhi.org',
    'izquierdaeco.org',
    'Volunteers-Solid.org',
    'chdcambodia.org',
    'ToMori.org',
    'gyu-edu.org',
    'ShinyDemise.org',
    'aresdanismanlik.org',
    'ElkSuriname.org',
    '911ca.org',
    '1111mx.org',
    'tss2015.org',
    'wiki-control-de-plagas.org',
    'spanishhealthministryinc.org',
    'sttimothysanglicanyouth.org',
    'SoHorace.org',
    'EthicalPup.org',
    'nuovistilidivitapadova.org',
    'video-institucional.org',
    'CamarilloSunriseRotary.org',
    'xping.org',
    'womenspbc.org',
    '88lt.org',
    '1000Foods.org',
    'HouseOfHopeForWomen.org',
    'g4cstudentchallenge.org',
    'kodlamasaati.org',
    '10YouTube.org',
    'AlexanderGeorge.org',
    'PisgahCycling.org',
    '5Horsemen.org',
    'Nano-Gel.org',
    'rodobrana.org',
    'SandersForPresident.org',
    'druide.org',
    'GatoKitty.org',
    'farmaciapopular.org',
    'drtekemiadorsey.org',
    'hkjepf.org',
    'heartofedmondssd.org',
    'rumbleinrio.org',
    'preventionsuicidemcq.org',
    'madewithloveinparis.org',
    'Team206.org',
    'pensandoenriver.org',
    'epyskopat.org', */

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


    //过滤没有google index活着index大于120的域名
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