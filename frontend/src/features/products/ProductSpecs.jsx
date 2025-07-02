function ProductSpecs({ productSpecs }) {
	const specs = Object.entries(productSpecs);

	const formatSpec = (spec) => {
		if (Array.isArray(spec)) {
			return spec.join(", ");
		} else {
			return spec;
		}
	};

	return (
		<div>
			<div>
				<ul>
					{specs.map((spec, i) => (
						<li key={i}>
							<p>
								<span className="uppercase font-bold">{spec[0]}: </span>
								<span>{formatSpec(spec[1])}</span>
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default ProductSpecs;
