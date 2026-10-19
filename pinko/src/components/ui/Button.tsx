import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,color,border-color,transform] duration-200 " +
  "ease-[cubic-bezier(.22,.61,.36,1)] active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-ink",
  secondary:
    "border border-control bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink underline decoration-control underline-offset-4 hover:decoration-accent",
};

const sizes: Record<Size, string> = {
  // 44px+ touch target on both sizes.
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  const parts = [base, variants[variant], className];
  if (variant !== "ghost") parts.splice(2, 0, sizes[size]);
  return parts.filter(Boolean).join(" ");
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
