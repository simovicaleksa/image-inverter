import { cn } from "~/lib/utils";

type TypographyProps = {
  children?: React.ReactNode;
  className?: string;
};

export function TypographyH1(props: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", props.className)}>
      {props.children}
    </h1>
  );
}

export function TypographyP(props: TypographyProps) {
  return <p className={cn("leading-7 not-first:mt-6", props.className)}>{props.children}</p>;
}
