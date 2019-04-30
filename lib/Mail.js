const nodemailer = require('nodemailer');
const { mail } = require('../account');



class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            secureConnection: true, // use SSL
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: mail.sender.user,
                pass: mail.sender.pass 
            }
        });
    }
    send(checkList) {

        let html = `
        <table border="1" style="border-collapse: collapse; text-align:center; padding: 10px;">
            <tr>
                <td>编号</td>
                <td>域名</td>
                <td>Godaddy售价</td>
                <td>Google Index</td>
                <td>快照连续数</td>
                <td>抓取异常</td>
            </tr>
        `;

        checkList.forEach((item, index) => {
            let { domain, gIndex, continuousYears, crawlInfo, price } = item;
            let crawlHTML = '';
            crawlInfo.forEach(info => {
                if (!info.redirect && !info.error) return;
                crawlHTML += `
                    <tr>
                        <td>${info.year}年：</td>
                        ${info.redirect ? `<td style="color:green;">redirect: ${info.redirect}</td>` : `<td style="color:red;">error: ${info.error}</td>`}
                    </tr>
                `;
            });

            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${domain}</td>
                    <td>${price}</td>
                    <td>${gIndex}</td>
                    <td>${continuousYears}年</td>
                    <td>
                        <table>${crawlHTML}</table>
                    </td>
                </tr> 
            `;
        });


        let mailOptions = {
            from: mail.sender.user,
            to: mail.receivers[0],
            subject: '请检查以下域名',
            html
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

