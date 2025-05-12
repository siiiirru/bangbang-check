"use client"

import { createContext, useContext, useState, forwardRef } from "react"
import { cn } from "../../lib/utils"
import { Circle } from "lucide-react"

const RadioGroupContext = createContext({
  value: "",
  onValueChange: () => {},
})

function RadioGroup({ value, defaultValue, onValueChange, className, children, ...props }) {
  const [internalValue, setInternalValue] = useState(defaultValue || "")

  const contextValue = {
    value: value !== undefined ? value : internalValue,
    onValueChange: (newValue) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
  }

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

const RadioGroupItem = forwardRef(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useContext(RadioGroupContext)
  const checked = selectedValue === value

  return (
    <div
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "bg-background",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {checked && <Circle className="h-2.5 w-2.5 fill-current text-current" />}
    </div>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
