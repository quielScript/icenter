function SectionHeader({ text1 = "", text2 = "" }) {
	return (
		<h2 className="space-x-2 text-xl sm:text-2xl md:text-3xl font-bold mb-5 md:mb-10">
			<span className="text-licorice-black uppercase">{text1}</span>
			<span className="text-heliotrope-gray uppercase">{text2}</span>
		</h2>
	);
}

export default SectionHeader;
