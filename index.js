const sleep = require('sleep-promise');
const { Google } = require('./lib/Google');
const { WebArchive } = require('./lib/WebArchive');
const { Mail } = require('./lib/Mail');
const { DomainAvailable } = require('./lib/DomainAvailable');



let sourceDomainList = [
    'FunkLore.eu',
    'Bella-MacChina.eu',
    '4FreeGay.eu',
    'PropertyAdministrator.eu',
    'GlobalCasa.eu',
    'nauka-a-biznes.pl',
    'dwmp.pl',
    'kobietanamotocyklu.pl',
    '4jg.eu',
    'fastebm.eu',
    'Mobilise-Europe.eu',
    'ebanki.com.pl',
    'lecharme.pl',
    'auto-biznes.com.pl',
    'lukaszgocal.pl',
    'irytacje.pl',
    'wyszukiwarkagier.pl',
    'oponyifelgi.com.pl',
    'kooperacja.biz.pl',
    'holsztynyzpolski.pl',
    'Cumshot-Gay.eu',
    'sgolc.eu',
    'atem-formation.eu',
    'Ross.travel',
    'legia-ukpw.pl',
    'KirAs.eu',
    'inzerce-pujcek.eu',
    'disenowebmadrid.eu',
    'intraluoghi.eu',
    'genotypedieet.eu',
    'omjc.com.mx',
    'cui.com.mx',
    'victormanrique.com.mx',
    'nikolas.com.ua',
    'GayPerVers.eu',
    'comenius-living-together.eu',
    'sovet.travel',
    'planetex.travel',
    'giorgioprovolo.eu',
    'simba.travel',
    'netzwerk-technik.eu',
    'DreamSatHeart.eu',
    'oberweite.eu',
    'pinkee.eu',
    'WeddingPhotographs.eu',
    'rdj-concept.eu',
    'svoge.eu',
    'tworzeniestroninternetowych.eu',
    'Nephrops.eu',
    'servcomp.eu',
    'bodlinka.eu',
    'BioBodyCare.eu',
    'nicopolisadnestum.eu',
    'irheum.eu',
    'praesens.eu',
    'rc-jets.eu',
    'FoodFacilities.eu',
    'BikerCom.eu',
    'cbci.eu',
    'kaniv.eu',
    'chronotiming.eu',
    'SkylineModels.eu',
    'zoonatura.eu',
    'bufalobranco.eu',
    'EventPhotos.eu',
    'akcyza.eu',
    'TrustedComputing.eu',
    'nymfomanen.eu',
    'Fortresses.eu',
    'NeoPower.eu',
    'babcompany.eu',
    'sfmb.eu',
    'letownia.eu',
    'biznesowo.eu',
    'AirSpeak.eu',
    'serrureriefosses.fr',
    'polska-przychodnia.eu',
    'uchwyty.eu',
    'salento-turismo.eu',
    'delebarre-eurl.fr',
    'imartedizioni.it',
    'InfoAlt.it',
    'miramonteemare.it',
    'ubaldopassamonti.it',
    'stabiloplay.it',
    'articoligiardino.it',
    'studiomra.it',
    'verde-basilico.it',
    'WastewayProject.it',
    'ClubLabiella.it',
    'cuneesi-progweb.it',
    'PuntoOpera.it',
    'meneguzzicarlo.it',
    'lacittadigianburrasca.it',
    'masededitore.it',
    'RallyValleDaosta.it',
    'visitadasalerno.it',
    'fpge.it',
    'accademiacinofila.it',
    'globalc.it',
    'LaquilaDoro.it',
    'progettonovivelia.it',
    'claudioesusy.it',
    'coloraletueidee.it',
    'farmaciasatulli.it',
    'EurekaSound.it',
    'elettronicamania.it',
    'Tempo-Libero.it',
    'centriesteticibenessere.it',
    'ReconnectYourself.it',
    'teeshirt-personnalise.fr',
    'CabOnIveTratEarTisTicHe.it',
    'OsirideCalabria.it',
    'kayakavventura.it',
    'mdlmusic.it',
    'cooperazionesviluppo.it',
    'Pisa2015.it',
    'AffinityAgency.it',
    'ArtSmart.it',
    'GoldenTravel.it',
    'VitiColToRivalChiavenna.it',
    'HotelRitaMajor.it',
    'KrisTallHotel.it',
    'frontoniindustriale.it',
    'TosaToArgante.it',
    'BeMotion.fr',
    'ladounia.fr',
    'serrurerie-sarcelles.fr',
    'LastMinutePasQua.it',
    'BizFactor.it',
    'mipia.it',
    'giorgiomastrocola.it',
    'BikersPlanet.it',
    'Node-Alsace.fr',
    'filippogiannini.it',
    'dirittierovesci.it',
    'igiardinidinoto.it',
    'artigianoaccessori.it',
    'extension-cheveux-valence.fr',
    'VeneziaTecNoLogie.it',
    'MariposaPaestum.it',
    'eugeniomelandri.it',
    'QuarTauMenTata.it',
    'SurfActivityAlbenga.it',
    'CarlOfOrin.it',
    'mahyma.it',
    'pesaronuoto.it',
    'tripolibia.it',
    'andreagregori.it',
    'serrurerietaverny.fr',
    'liabinetti.it',
    'UmbraNet.it',
    'hotelvoli.it',
    'serruriersmaisonsalfort.fr',
    'serruriershouilles.fr',
    'SicilyDreams.it',
    'fioribianchi.it',
    'TheFactoryUrbanLab.it',
    'siemenna.it',
    'piddi.it',
    'vitrerie75013.fr',
    'irisversari.it',
    'hotelarabescorimini.it',
    'darinatzvetkova.it',
    'stephdesign.it',
    'serrureriegoussainville.fr',
    'halaa-ra-masse.fr',
    'FestivalDelLambrusco.it',
    'IonicWhite.it',
    'serruriers-bures-sur-yvette.fr',
    'ronanlevesque.fr',
    'ds-coiffure-arcachon.fr',
    'cdpauto.fr',
    'OkeyToday.fr',
    'pompesfunebresparis.fr',
    'serrureriepontoise.fr',
    'vitriervitrysurseine.fr',
    'saintamantrochesavine.fr',
    'platrerie-sologne.fr',
    'jacquesvolcouve.fr',
    'sexinthecity.eu',
    'DebouchAge-Canalisation-Paris.fr',
    'rzesy.eu',
    'relatera.eu',
    '100servis.eu',
    'pazzaglinifirenze.it',
    'serrurerieleraincy.fr',
    'serrurierschillymazarin.fr',
    'serrurerieleblancmesnil.fr',
    'serrurerielimeilbrevannes.fr',
    'CaliGrama.eu',
    'ArgoNeo.eu',
    'architettiberetta.it',
    'Jean-ChrisTophe-Letang.fr',
    'tramediluce.it',
    'noleggioautobustorino.it',
    'coltiviamolafamiglia.it',
    'charminghouseintuscany.it',
    'gruppo-one.it',
    'centrosportivorenzotrovo.it',
];



let checkList = [];

async function main() {


    //获取域名列表----待完成

    // 过滤在godday not available的域名
    let { availableDomainList, availablePrices } = await (new DomainAvailable()).check(sourceDomainList);

    if (!availableDomainList.length) return;
   

    //过滤google index数量小于3或者大于200的域名
    let { domainList, indexCnts, prices } = await (new Google()).filterByIndex(availableDomainList, availablePrices);

    if (!domainList.length) return;



    //webarchive过滤
    for (let i = 0, len = domainList.length; i < len; i++) {
        let domain = domainList[i];

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
            price: prices[i],
            gIndex: indexCnts[i],
            continuousYears,
            crawlInfo,
        });

        //await sleep(10000);

    }
    if (!checkList.length) return;
    console.log(3);

    (new Mail()).send(checkList);



}


main();