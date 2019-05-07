//const sleep = require('sleep-promise');
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
    'farmaciapopular.org',
    'drtekemiadorsey.org',
    'hkjepf.org',
    'heartofedmondssd.org',
    'rumbleinrio.org',
    'preventionsuicidemcq.org',
    'madewithloveinparis.org',
    'Team206.org',
    'pensandoenriver.org',
    'epyskopat.org',
    'ncleftmeout.org',
    'VellIchor.org',
    'HopesSeed.org',
    'anastasiabaptistearlyed.org',
    'giss-consult.org',
    'JaneiroBranco.org',
    'DariEnfieldHockey.org',
    'SeeCarbonRun.org',
    'cpiaparma.org',
    'DriverTech.org',
    'wiconiwawokiya.org',
    'AngelFest.org',
    'TailForWindows.org',
    'y09tu.org',
    'pendikescort.org',
    'gbc-saudi.org',
    'SoftHopper.org',
    'isfnt-13.org',
    'thuatngu.org',
    'YanceyHumane.org',
    'tnbiotech.org',
    'pornomilftoon.org',
    'vojagado.org',
    'vankitapfuari.org',
    'VivoSystems.org',
    'pickledbd.org',
    'kesbangpol-pekalongankota.org',
    'LikesDepot.org',
    'sbajapan.org',
    'sc-ovca.org',
    'SangLee.org',
    's-afe.org',
    'ocmsevilla.org',
    'nsc-india.org',
    'ntknightsfootball.org',
    'Over40DatingSites.org',
    'kelaskepo.org',
    'JungleWaterProject.org',
    'IsraelGallery.org',
    'gc2016worship.org',
    'jfkindia.org',
    'hrseva.org',
    'HiveDean.org',
    'jogosfriv2017.org',
    'hindumahasabhaa.org',
    'remz-jay.org',
    'fredbarendsma.org',
    'cid-ineadec.org',
    'owaspthailand.org',
    'AuthorLaurAtJohnson.org',
    'OmicronPsiOmega.org',
    'BarAlgin.org',
    'fulizle.org',
    'BrasilTomorrow.org',
    'AlignHealthEquityDevelop.org',
    '4TheDefense.org',
    'newhavenaeyc.org',
    '247Into.org',
    'DartingTonSpace.org',
    'emprendetijuana.org',
    'jrat-project.org',
    'oldetownejefferson.org',
    'ReactCanada.org',
    'CarlosQuintana.org',
    'guzelevim.org',
    'FrankfortCarClub.org',
    'LogicWriter.org',
    'clcusawest.org',
    'CelebrityHouses.org',
    'InsidePolygamy.org',
    'PhillyAgainstSantoRum.org',
    'WildwoodsHydroFest.org',
    'activiti-cn.org',
    'BestResumeTemplate.org',
    'Diabetes-Obesity-Research.org',
    'ijei.org',
    'vademecumaev.org',
    'HomingPigeons.org',
    'MaritimeSources.org',
    'inovatifsurdurulebilirlik.org',
    'ProPomerania.org',
    'chothuechungcu.org',
    '1yao.org',
    'imajdesign.org',
    'CasaMenTobaRato.org',
    'anicole.org',
    'shrisakthisteels.org',
    'iscd-psu.org',
    'Islam-SouMission.org',
    'wesleyumcniles.org',
    'JellyJam.org',
    'crownedeagleent.org',
    'WebWired.org',
    'AllAboutAdultAdd.org',
    'HealthAndWater.org',
    'KidsFirstBasketball.org',
    'HousePaintingTampa.org',
    'aide-et-action-int.org',
    'ChrisTourHopeParish.org',
    'izmirescortsitesi.org',
    'anpdiperugia.org',
    'GalapagosWind.org',
    'qtbelf.org',
    'HolyTrinity-Madeira.org',
    'qhpx.org',
    'sfimmunize.org',
    '24RingTone.org',
    'Travel-Cappadocia.org',
    'zrsks.org',
    'MusicSheets.org',
    'usaudimi.org',
    '21stcenturybuilder.org',
    'aesnc.org',
    'YellowTrucking.org',
    'aog-usafa.org',
    'SeanReynolds.org',
    'mozartbinacional.org',
    'lfchi.org',
    'mdjiberville.org',
    'woa-ua.org',
    'jon-bernthal.org',
    'carlosguastavino.org',
    'itutr.org',
    'baiyangdian.org',
    'lmvsa.org',
    'BigTorrentLive.org',
    'digitalnts.org',
    'ardischi.org',
    'CoolBrandsHouse.org',
    'LanguageFactory.org',
    'TradeKey.org',
    'ma-net.org',
    'StjoeMusic.org',
    'MegaTraffic.org',
    'yepi7.org',
    'usrtownsquare.org',
    'IzmirEscort3.org',
    'PepperDineDif.org',
    'SlaveryIsReal.org',
    'cpadelhi.org',
    'lavoroesicurezza.org',
    'ziming.org',
    'ManifestLove.org',
    'pablosebastia.org',
    'BodyRevolutionReviews.org',
    'DiasporaVoteForNigerians.org',
    'firiv.org',
    'Alternative-Agriculture.org',
    'student-servis.org',
    'hprdindia.org',
    'cupio.org',
    'missamericaunida.org',
    'DirectHealthMedia.org',
    'StandardsImpact.org',
    'LinuxInstallDay.org',
    'salvetti.org',
    'Pea-Pod.org',
    'blumpkin.org',
    'wolaz.org',
    'l9a.org',
    'ChurchillAreaNeighbors.org',
    'NevadaCasa.org',
    'StarVille.org',
    'CoralCalciumGuru.org',
    '1MillionDollars.org',
    'vin-pas-cher-france.org',
    'Dog-Allergy.org',
    'tomccsweden.org',
    'sternhhs.org',
    'rhccfund.org',
    'ncri-mhrd.org',
    'FreedomTechnology.org',
    'Eclipse-Blog.org',
    'BlackTranny.org',
    'SkateWallawalla.org',
    'hclu.org',
    'ps86.org',
    'smalena.org',
    'share-huronia.org',
    'mytv26.org',
    'madma.org',
    'TheirBirthright.org',
    'ws120.org',
    'mitefa.org',
    'libertedelafesse.org',
    'ToposRealEstate.org',
    'StinkFest.org',
    'MangosProject.org',
    'ImprovingYourWorld.org',
    'ethnicnewz.org',

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

    (new Mail()).send(checkList);



}


main();