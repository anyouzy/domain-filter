const nodemailer = require('nodemailer');
const {
    mail
} = require('../account');



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
    makeContent(task) {
        let content = `
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

        task.forEach((item, index) => {
            let {
                domain,
                indexCnt,
                continuousYears,
                crawlInfo,
                price
            } = item;
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

            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${domain}</td>
                    <td>${price}</td>
                    <td>${indexCnt}</td>
                    <td>${continuousYears}年</td>
                    <td>
                        <table>${crawlHTML}</table>
                    </td>
                </tr> 
            `;
        });

        return content;

    }

    makeRandom(maxVal) {
        return Math.floor(Math.random() * maxVal);
    }

    assignTask(checkList) {
        mail.receivers.forEach((receiver, receiverIndex) => {
            let task = checkList.filter((checkData, checkIndex) => (checkIndex % mail.receivers.length) === receiverIndex);
            let content = this.makeContent(task);
            this.send(content, receiver);
        });
    }
    send(content, receiver) {

        let mailOptions = {
            from: mail.sender.user,
            to: receiver,
            subject: '请检查以下域名',
            cc: mail.receivers[0],
            html: content
        };
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}




module.exports = {
    Mail
}