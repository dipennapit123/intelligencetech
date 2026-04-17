"use client";

import Link from "next/link";
import * as React from "react";

type CommonProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLinkProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

const base =
  "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-it-accent focus-visible:ring-offset-2 focus-visible:ring-offset-it-bg disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary:
    "bg-it-accent text-it-black hover:brightness-95 active:brightness-90",
  secondary:
    "bg-it-bg text-it-text border border-black/10 hover:bg-black/5 active:bg-black/10",
};

const sizes: Record<NonNullable<CommonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

export function Button(props: ButtonAsButtonProps | ButtonAsLinkProps) {
  if ("href" in props && typeof props.href === "string") {
    const {
      href,
      variant = "primary",
      size = "md",
      className,
      children,
      ...anchorRest
    } = props as ButtonAsLinkProps;
    const classes = cx(base, variants[variant], sizes[size], className);
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", size = "md", className, children, ...buttonRest } =
    props;
  const classes = cx(base, variants[variant], sizes[size], className);
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}

