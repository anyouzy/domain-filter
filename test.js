const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://find.godaddy.com/domainsapi/v1/search/exact?q=pansuk.org&key=dpp_search&pc=&ptl=&itc=dpp_absol1');
    let content = await page.content();
    content = await page.evaluate(()=>{
        let jsonData = JSON.parse(document.querySelector('pre').innerHTML);
        return { isAvailable: jsonData.ExactMatchDomain.IsAvailable, price: jsonData.Products[0].PriceInfo.CurrentPriceDisplay};
    });
    console.log(content);
    
    await browser.close();
})();