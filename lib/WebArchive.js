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


class WebArchive {

    constructor(domain) {
        this.acyAPI = `http://web.archive.org/__wb/sparkline?url=${domain}&collection=web&output=json`;
        this.capAPI = `http://web.archive.org/__wb/calendarcaptures?url=${domain}`;

        this.archiveData = {};
        this.archiveYears = [];
    }


    async hasArchiveInfo() {
        try {
            let res = await fetch(this.acyAPI);
            let {
                years
            } = await res.json();
            if (!years) return 0;
            this.archiveData = years;
            this.archiveYears = Object.keys(this.archiveData).map(yearStr => Number.parseInt(yearStr));
            return 1;
        } catch (e) {
            console.log(e.message);
        }
    }


    getContinuousYears() {
        let len = this.archiveYears.length;
        if (len < 3) return -1; //长度小于3，直接返回-1，不满足条件
        let continuousYears = 1;
        for (let i = len - 2; i >= 0; i--) {
            if (this.archiveYears[i] !== this.archiveYears[i + 1] - 1) break;
            continuousYears++;
        }
        return continuousYears;
    }


    async getCrawlInfo() {

        let data = [];

        for (let i = 0, len = this.archiveYears.length; i < len; i++) {
            let crawlMonths = []; //该年哪几个月有抓取记录
            let archiveYear = this.archiveYears[i];
            this.archiveData[archiveYear].forEach((crawlCount, index) => {
                if (0 === crawlCount) return;
                crawlMonths.push(index);
            });

            let thisYearData = await this.getCrawlInfoByYear(archiveYear, crawlMonths);
            data.push(Object.assign({
                year: archiveYear
            }, thisYearData));
        }

        return data;
    }



    async getCrawlInfoByYear(year, crawlMonths) {

        let data = {
            redirect: 0,
            error: 0,
        };


        let url = this.capAPI + `&selected_year=${year}`;

        try {
            let res = await fetch(url);
            let jsonData = await res.json();
            let monthDatas = Array.from(jsonData).filter((v, index) => crawlMonths.includes(index));

            monthDatas.forEach(monthData => {

                monthData.forEach(weekData => {

                    weekData.forEach(dayData => {
                        if ((!dayData) || (!dayData.hasOwnProperty('st'))) return;
                        let statusCodes = dayData.st;
                        statusCodes.forEach(statusCode => {
                            if (statusCode >= 300 && statusCode <= 399) {
                                data.redirect++;
                            }
                            if (statusCode >= 400 && statusCode <= 499) {
                                data.error++;
                            }
                        })
                    });
                });
            });
            return data;
        } catch (e) {
            console.log(e.message);
        }
    }




}

module.exports = {
    WebArchive
}