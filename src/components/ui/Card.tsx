import * as React from "react";

function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl bg-it-bg shadow-sm ring-1 ring-black/10 transition hover:shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

