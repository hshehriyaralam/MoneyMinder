import * as React from "react"
import { cn } from "../../lib/utils"

const DockIconButton = React.forwardRef(
  ({ icon: Icon, label, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative group p-3 rounded-lg",
          "hover:bg-secondary transition-colors",
          className
        )}
      >
        <Icon className="w-8 h-5 text-foreground" />
        <span
          className={cn(
            "absolute -top-7 left-1/2 -translate-x-1/2",
            "px-1.5 py-0.5 rounded text-[10px]",
            "bg-muted text-muted-foreground",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity whitespace-nowrap pointer-events-none shadow"
          )}
        >
          {label}
        </span>
      </button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef(({ items, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-6 w-full z-50 flex items-center justify-center p-2",
        className
      )}
    >
      <div className="w-full max-w-4xl rounded-2xl flex items-center justify-center bg-background/90 backdrop-blur-lg border border-border shadow-lg px-4 py-2">
        {items.map((item) => (
          <DockIconButton key={item.label} onClick={item.onClick} {...item} />
        ))}
      </div>
    </div>
  )
})
Dock.displayName = "Dock"

export default Dock
