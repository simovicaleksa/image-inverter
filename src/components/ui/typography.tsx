import { cn } from "~/lib/utils";

type TypographyProps = {
	children?: React.ReactNode;
	className?: string;
};

export function TypographyH1(props: TypographyProps) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-balance text-center font-extrabold text-4xl tracking-tight",
				props.className,
			)}
		>
			{props.children}
		</h1>
	);
}

export function TypographyP(props: TypographyProps) {
	return (
		<p className={cn("not-first:mt-6 leading-7", props.className)}>
			{props.children}
		</p>
	);
}
