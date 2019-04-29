const nodemailer = require('nodemailer');
//const smtpTransport = require('nodemailer-smtp-transport');
//const wellknown = require("nodemailer-wellknown");
//const config = wellknown("QQ");




class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secureConnection: true, // use SSL
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: '415489280@qq.com',
                pass: 'crzucwwnbdtebhcd' // 授权码
            }
        });
    }
    send(checkList) {
        /*
            domain,
            gIndex,
            continuousYears,
            crawlInfo,
        */

        let text = '';

        checkList.forEach((item, index) => {
            let { domain, gIndex, continuousYears, crawlInfo } = item;
            text += `
            ${index + 1}. ${domain}:
                    ---Google Index: ${gIndex}
                    ----webArchive快照连续年数: ${continuousYears}
                    ----抓取状态：${JSON.stringify(crawlInfo)}  
            `;
        });


        let mailOptions = {
            from: '415489280@qq.com',
            to: 'tigerzhang@soarinfotech.com',
            subject: '请检查以下域名',
            text
        };
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}




module.exports = {
    Mail
}

