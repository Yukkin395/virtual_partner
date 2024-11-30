import { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "google";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "w-full py-3 rounded-lg font-semibold",
          "transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-purple-500 text-white hover:bg-purple-600":
              variant === "primary",
            "bg-gray-200 text-gray-800 hover:bg-gray-300":
              variant === "secondary",
            "bg-red-500 text-white hover:bg-red-600": variant === "google",
          },
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
