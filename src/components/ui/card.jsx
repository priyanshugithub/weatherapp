import React from "react";
import clsx from "clsx";

export const Card = ({ className, ...props }) => (
  <div
    className={clsx(
      "rounded-2xl border bg-white shadow dark:border-zinc-800 dark:bg-zinc-900",
      className
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }) => (
  <div className={clsx("p-6", className)} {...props} />
);