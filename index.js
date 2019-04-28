const { getIndex } = require('./lib/getIndex');


let domain = 'olivero.com.ua';
async function main() {
    let res = await new getIndex(domain).run();
    console.log(res);
}


main();