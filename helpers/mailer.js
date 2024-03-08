const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "",
        pass: ""
    }
});


const sendMail = async(email, subject, content) => {

    try {

        var mailOptions = {
            from: "your-mail-address@example.com",
            to: email,
            subject: subject,
            html: content
        };

        transporter.sendMail(mailOptions, (error, info) => {

            if (error) {
                console.log(error);
            }

            console.log("We've just sent an email to the address you provided with your registration details. Please check your inbox. If you don't see the email in a few minutes, don't forget to check your spam folder.", info.messageId);

        });
        
    } catch (error) {
        console.log(error.message);
    }

}

module.exports = {
    sendMail
}
