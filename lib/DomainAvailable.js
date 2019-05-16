const puppeteer = require('puppeteer');


class DomainAvailable {

    async check(domainList, platform = 'godaddy') {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');

        let data = {
            availableDomainList: [],
            availablePrices: [],
        };

        for (let i = 0, len = domainList.length; i < len; i++) {
            let domain = domainList[i];
            let api = {
                godaddy: `https://find.godaddy.com/domainsapi/v1/search/exact?q=${domain}`,
            };
            let info = {};
            try {
                await page.goto(api[platform]);
                await page.waitForSelector('pre');
                info = await page.evaluate(() => {
                    let jsonData = JSON.parse(document.querySelector('pre').innerHTML);
                    return {
                        isAvailable: jsonData.ExactMatchDomain.IsAvailable,
                        price: jsonData.Products[0].PriceInfo.CurrentPriceDisplay
                    };
                });
            } catch (e) {
                console.error('check domain' + 'available error: ' + e.message);
                data.availableDomainList.push(domain);
                data.availablePrices.push('网络错误');
                continue;
            }

            if (!info.isAvailable) continue;
            data.availableDomainList.push(domain);
            data.availablePrices.push(info.price);
        }

        await browser.close();

        return data;
    }
}

module.exports = {
    DomainAvailable
}