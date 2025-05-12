"use client"

import { forwardRef } from "react"
import { cn } from "../../lib/utils"
import { Check } from "lucide-react"

const Checkbox = forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        checked ? "bg-primary text-primary-foreground" : "bg-background",
        className,
      )}
      onClick={() => onCheckedChange && onCheckedChange(!checked)}
      {...props}
    >
      {checked && <Check className="h-4 w-4 text-white" />}
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
