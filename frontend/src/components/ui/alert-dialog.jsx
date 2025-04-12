"use client"

import { useState, createContext, useContext } from "react"
import { cn } from "../../lib/utils"

const AlertDialogContext = createContext({
  open: false,
  onOpenChange: () => {},
})

function AlertDialog({ children, open, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(open || false)

  const handleOpenChange = (value) => {
    setIsOpen(value)
    onOpenChange?.(value)
  }

  return (
    <AlertDialogContext.Provider value={{ open: open !== undefined ? open : isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogContent({ children, className, ...props }) {
  const { open } = useContext(AlertDialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

function AlertDialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
}

function AlertDialogFooter({ className, ...props }) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
}

function AlertDialogTitle({ className, ...props }) {
  return <h3 className={cn("text-lg font-semibold", className)} {...props} />
}

function AlertDialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function AlertDialogAction({ className, ...props }) {
  const { onOpenChange } = useContext(AlertDialogContext)

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }) {
  const { onOpenChange } = useContext(AlertDialogContext)

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
