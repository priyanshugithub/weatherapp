import React, { forwardRef } from "react";
import clsx from "clsx";

export const Button = forwardRef(
  ({ className, size = "md", variant = "primary", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50";
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6",
      icon: "h-10 w-10", // square
    };
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
      ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
    };

    return (
      <button
        ref={ref}
        className={clsx(base, sizes[size], variants[variant], className)}
        {...props}
      />
    );
  }
);