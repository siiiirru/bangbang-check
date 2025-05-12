"use client"

import { useState, createContext, useContext } from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const AccordionContext = createContext({
  value: "",
  onValueChange: () => {},
})

export function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || "")

  const contextValue = {
    value: value !== undefined ? value : internalValue,
    onValueChange: (newValue) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    type,
    collapsible,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, className, children, ...props }) {
  return (
    <div className={cn("border-b", className)} {...props}>
      {children}
    </div>
  )
}

export function AccordionTrigger({ className, children, ...props }) {
  const { value, onValueChange, type, collapsible } = useContext(AccordionContext)

  const isOpen = type === "single" ? value === props.value : value?.includes(props.value)

  const handleClick = () => {
    if (type === "single") {
      if (collapsible && value === props.value) {
        onValueChange("")
      } else {
        onValueChange(props.value)
      }
    } else {
      if (isOpen) {
        onValueChange(value.filter((v) => v !== props.value))
      } else {
        onValueChange([...(value || []), props.value])
      }
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
    </div>
  )
}

export function AccordionContent({ className, children, ...props }) {
  const { value, type } = useContext(AccordionContext)

  const isOpen = type === "single" ? value === props.value : value?.includes(props.value)

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all",
        isOpen ? "animate-accordion-down" : "animate-accordion-up h-0",
        className,
      )}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}
