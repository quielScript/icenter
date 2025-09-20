import nodemailer from "nodemailer";
import Transport from "nodemailer-brevo-transport";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESSFUL,
} from "../views/emailTemplates.js";

// TODO: IMPLEMENT GOOGLE SMTP

class Email {
	constructor(user) {
		this.to = user.email;
		this.firstName = user.firstName;
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
	async sendPasswordReset(resetURL, subject) {
		const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
			"{userName}",
			this.firstName
		).replace("{resetURL}", resetURL);

		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
		};

		await this.newTransport().sendMail(mailOptions);
	}

	async sendPasswordResetSuccess() {
		const html = PASSWORD_RESET_SUCCESSFUL.replace(
			"{userName}",
			this.firstName
		);

		const mailOptions = {
			from: this.from,
			to: this.to,
			subject: "Password Reset Successful",
			html,
		};

		await this.newTransport().sendMail(mailOptions);
	}
}

export default Email;
