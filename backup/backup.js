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
    'prista-oil.kz',
    'ecampus.net.in',
    'seansy.kz',
    'minuteannonce.fr',
    'NoLife-Online.fr',
    'secujob.fr',
    'st-johns-marhauli.in',
    'maitresselouise.fr',
    'leblancdosmery.fr',
    'MachAero.fr',
    'investissementfinancier.fr',
    'derrey-voisin.fr',
    'mabonneetoileduport.fr',
    'mcdo-coteouest.fr',
    'smartrium.fr',
    'traversees-lapiece.fr',
    'ModernHotel-Valenciennes.fr',
    'Service-TeleMix.kz',
    'hydrosud-chauray.fr',
    'FirewallSecurity.fr',
    'romagnagrandieventi.it',
    'latuabottiglia.it',
    'arwadshipcare.in',
    'olivastrodiloceri.it',
    'IronSpinning.it',
    'urgo-cestlepied.fr',
    'LawLab.kz',
    'CaroleChavAnne.fr',
    'sierzputowski.fr',
    'tecnosportds.it',
    'pablito982.it',
    'invallemaira.it',
    'ngcommunication.it',
    'internogiorno.it',
    'pavimentazionigripav.it',
    'acchiappalofferta.it',
    'marcotroianosindaco.it',
    'neronigastronomia.it',
    'r2-design.it',
    'noveliaspenthouse.it',
    'ItalianMusicStore.it',
    'grunfstudio.it',
    'ebim.it',
    'edilturci.it',
    'IllBuy.it',
    'fibafirenze.it',
    'busatocostruzioni.it',
    'jcfdesign.it',
    'affariweb.it',
    'Sale-Salute.it',
    'ToysGuardian.it',
    'ecmsrl.it',
    'prismapsi.it',
    'formazioneper.it',
    'ebooksport.it',
    'GreenGoMoving.it',
    'rdcar.it',
    'sorin-cartongesso.it',
    'gioielliabbate.it',
    'ediltechdilanfranca.it',
    'consorziosanbernardo.it',
    'gliostelli.it',
    'avvitoservice.it',
    'AsseZeta.it',
    'sognisegreti.it',
    'mdsystem.it',
    'massaggivicenza.it',
    'immobiliarecasaviva.it',
    'BabuShop.it',
    'trovare-clienti.it',
    'sonoanatomia.it',
    'WeddingCakeToriNo.it',
    'unacicognaperamica.it',
    'fotocentershop.it',
    'conzorsiocalabriaintavola.it',
    'serrandefaldi.it',
    'aonemanband.it',
    'grandaponteggi.it',
    'designlabsrl.it',


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