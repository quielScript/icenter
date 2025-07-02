import Button from "./Button";

function Hero() {
	return (
		<div className="flex items-center mx-5 xl:mx-0">
			<div className="mt-10 text-center sm:mt-0 sm:text-left">
				<h1 className="space-y-4 md:space-y-6 xl:space-y-8 mb-10 text-licorice-black">
					<p className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold xl:leading-16">
						All your favorite Apple products in one place
					</p>
					<p className="text-lg sm:text-base md:text-lg xl:text-xl font-light">
						Your one-stop shop for the latest Apple devices and accessories.
						Discover everything you need, tailored to your digital lifestyle.
					</p>
				</h1>

				<Button btnType="link" to="/products">
					Shop now &rarr;
				</Button>
			</div>

			<img
				src="/images/hero-img.png"
				alt="apple products"
				className="hidden sm:block sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]"
			/>
		</div>
	);
}

export default Hero;
