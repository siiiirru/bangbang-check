"use client"

import { useState, createContext, useContext, forwardRef } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

const SelectContext = createContext({
  value: "",
  onValueChange: () => {},
  open: false,
  onOpenChange: () => {},
})

function Select({ children, value, defaultValue, onValueChange, ...props }) {
  const [internalValue, setInternalValue] = useState(defaultValue || "")
  const [open, setOpen] = useState(false)

  const contextValue = {
    value: value !== undefined ? value : internalValue,
    onValueChange: (newValue) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
      setOpen(false)
    },
    open,
    onOpenChange: setOpen,
  }

  return (
    <SelectContext.Provider value={contextValue} {...props}>
      {children}
    </SelectContext.Provider>
  )
}

const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => {
  const { onOpenChange } = useContext(SelectContext)
  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => onOpenChange((open) => !open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = ({ className, children, ...props }) => {
  const { open } = useContext(SelectContext)

  return (
    <>
      {open ? (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      ) : null}
    </>
  )
}

const SelectItem = ({ className, value, children, ...props }) => {
  const { value: contextValue, onValueChange } = useContext(SelectContext)

  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=selected]:bg-accent data-[state=selected]:text-accent-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {contextValue === value && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
}

const SelectValue = ({ className, placeholder, children, ...props }) => {
  const { value } = useContext(SelectContext)

  return (
    <span className={cn("line-clamp-1", className)} {...props}>
      {value ? children : placeholder}
    </span>
  )
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
