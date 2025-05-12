"use client"

import { useState, createContext, useContext } from "react"
import { cn } from "../../lib/utils"

const TooltipContext = createContext({
  open: false,
  onOpenChange: () => {},
})

function TooltipProvider({ children }) {
  return <>{children}</>
}

function Tooltip({ children, open, onOpenChange, ...props }) {
  const [internalOpen, setInternalOpen] = useState(open || false)

  const handleOpenChange = (value) => {
    setInternalOpen(value)
    onOpenChange?.(value)
  }

  return (
    <TooltipContext.Provider value={{ open: open !== undefined ? open : internalOpen, onOpenChange: handleOpenChange }}>
      <div className="relative inline-block" {...props}>
        {children}
      </div>
    </TooltipContext.Provider>
  )
}

function TooltipTrigger({ children, asChild, ...props }) {
  const { onOpenChange } = useContext(TooltipContext)

  const Comp = asChild ? "span" : "button"

  return (
    <Comp
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
      onFocus={() => onOpenChange(true)}
      onBlur={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </Comp>
  )
}

function TooltipContent({ className, children, ...props }) {
  const { open } = useContext(TooltipContext)

  if (!open) return null

  return (
    <div
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
