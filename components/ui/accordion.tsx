import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
  activeItem: string | null
  setActiveItem: (value: string | null) => void
}>({ activeItem: null, setActiveItem: () => {} })

export function Accordion({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  type?: "single"
  collapsible?: boolean
}) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  value,
  className,
  children,
  ...props
}: {
  value: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("border-b", className)} {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { value })
        }
        return child
      })}
    </div>
  )
}

export function AccordionTrigger({
  value,
  className,
  children,
  ...props
}: {
  value?: string
  className?: string
  children: React.ReactNode
}) {
  const { activeItem, setActiveItem } = React.useContext(AccordionContext)
  const isOpen = activeItem === value

  const handleToggle = () => {
    setActiveItem(isOpen ? null : value || null)
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </button>
  )
}

export function AccordionContent({
  value,
  className,
  children,
  ...props
}: {
  value?: string
  className?: string
  children: React.ReactNode
}) {
  const { activeItem } = React.useContext(AccordionContext)
  const isOpen = activeItem === value

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-200",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}
