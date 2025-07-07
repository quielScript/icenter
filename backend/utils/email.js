import nodemailer from "nodemailer";

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
		// TODO: IMPLEMENT PRODUCTION EMAIL
		if (process.env.NODE_ENV === "production") {
			return;
		}

		// Development emails MailTrap
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
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
