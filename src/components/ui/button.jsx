import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "btn animate-none [--btn-focus-scale:1] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "btn-primary shadow-sm hover-lift",
        destructive: "btn-error shadow-sm hover-lift",
        outline: "btn-outline border-input bg-background hover-border-primary",
        secondary: "btn-secondary shadow-sm hover-lift",
        ghost: "btn-ghost hover-bg-primary",
        link: "btn-link underline-offset-4 hover:underline hover-text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "btn-sm h-9 rounded-md px-3",
        lg: "btn-lg h-11 rounded-md px-8",
        icon: "btn-square h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
