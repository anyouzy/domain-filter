const fetch = require('node-fetch');

/* API示例
http://web.archive.org/__wb/sparkline?url=mustafaselanik.com&collection=web&output=json 获取快照信息

返回数据：
{"last_ts":"20180808015156","first_ts":"20161231225250","years":{"2016":[0,0,0,0,0,0,0,0,0,0,0,1],"2017":[1,1,0,0,2,2,1,1,1,3,2,0],"2018":[0,0,1,0,0,0,0,1,0,0,0,0]}}

-----------------------------------------------------------------------------

http://web.archive.org/__wb/calendarcaptures?url=mustafaselanik.com&selected_year=2018  获取某一年的请求状态码信息

返回数据：

[[[null,{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},null,null,null]],[[null,null,null,null,{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},null,null,null]],[[null,null,null,null,{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{"cnt":1,"st":[302],"why":[["webwidecrawl","survey_00007","survey_crawl"]],"ts":[20180323195057]},{}],[{},{},{},{},{},{},{}]],[[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},null,null,null,null,null]],[[null,null,{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},null,null]],[[null,null,null,null,null,{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}]],[[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},null,null,null,null]],[[null,null,null,{},{},{},{}],[{},{},{},{"cnt":1,"st":[429],"why":[["webwidecrawl","wide00017","widecrawl"]],"ts":[20180808015156]},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},null]],[[null,null,null,null,null,null,{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},null,null,null,null,null,null]],[[null,{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},null,null,null]],[[null,null,null,null,{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},null]],[[null,null,null,null,null,null,{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},null,null,null,null,null]]]

*/


class getArchiveInfo {
    constructor(domain) {
        this.acyAPI = `http://web.archive.org/__wb/sparkline?url=${domain}&collection=web&output=json`;
        this.capAPI = `http://web.archive.org/__wb/calendarcaptures?url=${domain}`;
    }

    async getResStatus(year, capMonths) {
        let data = {
            code: 0,
            redirect: 0,
            openError: 0,
        };

        let url = this.capAPI + `selected_year=${year}`;

        try {
            let res = await fetch(url);
            let jsonData = await res.json();


            monthDatas = jsonData.filter(index => capMonths.includes(index));

            monthDatas.forEach(monthData => {

                monthData.forEach(weekData => {

                    weekData.forEach(dayData => {
                        if (!dayData.hasOwnProperty('st')) return;
                        let statusCodes = dayData.st;

                        statusCodes.forEach(statusCode => {
                            if (statusCode >= 300 && statusCode <= 399) {
                                data.redirect++;
                            }
                            if (statusCode >= 400 && statusCode <= 499) {
                                data.openError++;
                            }
                        })
                    });
                });
            });
            return data;
        } catch (e) {
            data.code = 1;
            return data;
        }
    }


    getContinuousYears(hasCapYears) {

        let continuousYears = 1;

        for (let i = hasCapYears.length - 2; i >= 0; i--) {
            if (hasCapYears[i] !== hasCapYears[i + 1] - 1) break;
            continuousYears++;
        }

        return continuousYears;
    }


    async getACY() {
        let data = {};
        try {
            let res = await fetch(this.acyAPI);
            let { years } = await res.json();

            if (!years) return '无webarchive数据';

            let hasCapYears = Object.keys(years);

            if (hasCapYears.length < 3) {
                data.acy = '<3';
            } else {
                data.acy = this.getContinuousYears(hasCapYears);
            }

            hasCapYears.forEach(year => {

                // let crawlCount = years[year].reduce((prev, cur) => prev + cur);

                capMonths = [];

                years[year].forEach((index, monthCrawlCount) => {
                    if (0 === monthCrawlCount) return;
                    capMonths.push(index);
                });

                let { code, redirect, openError } = this.getResStatus(year, capMonths);

                if (0 === code) {
                    data[year] = { crawlCount, redirect, openError };
                }

            });

        } catch (e) {

        }
    }
}