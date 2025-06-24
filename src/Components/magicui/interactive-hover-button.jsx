import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../utils/auth.js";

export const InteractiveHoverButton = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    (<button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full  p-2 px-15 py-1.5  font-semibold",
        className
      )}
      {...props}>
      <div className="flex items-center gap-4 ">
        <div
          className="h-2 w-2 rounded-full  transition-all duration-300 group-hover:scale-[100]"
          style={{backgroundColor : '#f04968'}}
          ></div>
        <span
          className="inline-block  transition-all duration-300 text-gray-700  group-hover:translate-x-12  group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center px-5  gap-3  text-gray-100 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>)
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
