import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";

class Email {
	constructor(user, subject, message) {
		this.to = user.email;
		this.firstName = user.firstName;
		this.subject = subject;
		this.message = message;
		this.from = `Exequiel Arco <${process.env.EMAIL_FROM}>`;
	}

	// Create transport
	newTransport() {
		// Production emails Brevo
		if (process.env.NODE_ENV === "production") {
			return nodemailer.createTransport(
				new Transport({
					apiKey: `${process.env.BREVO_API_KEY}`,
				})
			);
		}

		// Development emails MailTrap
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST_MAILTRAP,
			port: process.env.EMAIL_PORT_MAILTRAP,
			auth: {
				user: process.env.EMAIL_USERNAME_MAILTRAP,
				pass: process.env.EMAIL_PASSWORD_MAILTRAP,
			},
		});
	}

	// Send the actual email
	async send() {
		// Define mail options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject: this.subject,
			text: this.message,
		};

		// Create a transport and send email
		await this.newTransport().sendMail(mailOptions);
	}

	async sendPasswordReset() {
		await this.send();
	}
}

export default Email;
