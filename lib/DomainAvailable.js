const fetch = require('node-fetch');


class DomainAvailable {

    async check(domain, platform = 'godaddy') {

        let api = {
            godaddy: `https://find.godaddy.com/domainsapi/v1/search/exact?q=${domain}&key=dpp_search&pc=&ptl=&itc=dpp_absol1`,
        };

        try {
            let res = await fetch(api[platform]);
            let data = await res.json();
            return data.ExactMatchDomain.IsAvailable;
        } catch (e) {
            console.log(e.message);
            return '网络请求错误';
        }

    }
}

module.exports = {
    DomainAvailable
}