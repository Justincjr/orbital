import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // You can simply use false here
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.EMAIL_PW,
            },
        });

        await transporter.sendMail({
            from: process.env.USER_MAIL,
            to: email,
            subject: subject,
            text: text,
        });
        console.log('email sent successfully');
    } catch (error) {
        console.log('email not sent!');
        console.log(error);
        return error;
    }
};

export default sendEmail;
