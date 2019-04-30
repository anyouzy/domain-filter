const puppeteer = require('puppeteer');


class DomainAvailable {

    async check(domainList, platform = 'godaddy') {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let data = {
            availableDomainList: [],
            availablePrices: [],
        };

        for (let i = 0, len = domainList.length; i < len; i++) {
            let domain = domainList[i];
            let api = {
                godaddy: `https://find.godaddy.com/domainsapi/v1/search/exact?q=${domain}`,
            };

            await page.goto(api[platform]);
            await page.waitForSelector('pre');
            let info = await page.evaluate(() => {
                let jsonData = JSON.parse(document.querySelector('pre').innerHTML);
                return { isAvailable: jsonData.ExactMatchDomain.IsAvailable, price: jsonData.Products[0].PriceInfo.CurrentPriceDisplay };
            });

            if (!info.isAvailable) continue;
            console.log('available');
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