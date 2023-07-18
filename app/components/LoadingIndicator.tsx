export function LoadingIndicator() {
	const dots = new Array(3).fill(0);

	return (
		<div className="flex gap-2" role="status" aria-label="Loading">
			{dots.map((_, index) => {
				return <Dot key={index} index={index} />;
			})}
		</div>
	);
}

const Dot = ({ index }: { index: number }) => {
	return (
		<div
			className="h-4 w-4 animate-loading-scale rounded-lg bg-violet-500"
			style={{
				animationDelay: `${0.2 * index}s`,
			}}
		></div>
	);
};
