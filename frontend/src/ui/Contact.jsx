import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

function Contact() {
	return (
		<div className="max-w-7xl mx-auto pt-5 md:pt-12 pb-24">
			<div className="text-center">
				<SectionHeader text1="contact" text2="us" />
			</div>

			<div className="flex flex-col items-center justify-center md:flex-row gap-10 mx-8">
				<div>
					<img
						src="/images/contact-img.jpg"
						alt="contact us"
						className="w-[380px]"
					/>
				</div>
				<div className="space-y-5">
					<img
						src="/images/logo-main.png"
						alt="icenter"
						className="w-[150px]"
					/>

					<div className="flex items-center gap-2">
						<FaLocationDot />
						<p>Gen. McArthur Highway. Davao City, Philippines</p>
					</div>

					<div className="flex items-center gap-2">
						<FaPhone />
						<p>(704) 555-0127</p>
					</div>

					<div className="flex items-center gap-2">
						<FaEnvelope />
						<p>exequielarco23@gmail.com</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
