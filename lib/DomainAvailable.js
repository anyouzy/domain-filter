
class DomainAvailable {

    async check(browser, domain, platform = 'godaddy') {
        const page = await browser.newPage();
        let api = {
            godaddy: `https://find.godaddy.com/domainsapi/v1/search/exact?q=${domain}`,
        };

        let data;

        try {
            await page.goto(api[platform]);
            await page.waitForSelector('pre');
            data = await page.evaluate(() => {
                let jsonData = JSON.parse(document.querySelector('pre').innerHTML);
                return {
                    isAvailable: jsonData.ExactMatchDomain.IsAvailable,
                    price: jsonData.Products[0].PriceInfo.CurrentPriceDisplay
                };
            });
        } catch (e) {
            console.error(e.message);
            data = {
                isAvailable: '网络错误',
                price: '网络错误'
            }
        }

        return data;
    }


}

module.exports = {
    DomainAvailable
}