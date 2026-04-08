export function BackgroundGrid() {
	const COLOR = `var(--foreground)`;
	const OPACITY = 0.1;

	return (
		<div
			className="pointer-events-none fixed top-0 left-0 -z-10 size-full"
			style={{
				backgroundImage: `
                  linear-gradient(to right, ${COLOR} 1px, transparent 1px),
                  linear-gradient(to bottom, ${COLOR} 1px, transparent 1px)
                `,
				backgroundSize: "50px 50px",
				opacity: OPACITY,
			}}
		>
			<div className="fixed right-0 left-0 mx-auto aspect-square h-full bg-radial from-background/80 dark:from-background"></div>
		</div>
	);
}
