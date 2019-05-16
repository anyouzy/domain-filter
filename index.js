
const CronJob = require('cron').CronJob;
const { fetchAndFilter } = require('./lib');


const jobs = {
    org: '0 0 6 * * *',
    it: '0 0 17 * * *',
    be: '0 0 3 * * *',
    nl: '0 0 13 * * *',//
};

Object.keys(jobs).forEach(type => {
    new CronJob(jobs[type], () => { fetchAndFilter(type) }, null, true, 'Asia/Shanghai');
});
