import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

const DockIconButton = React.forwardRef(
  ({ icon: Icon, label, onClick, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
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
    "absolute -top-7 left-1/2 -translate-x-1/2"  ,
    "px-1.5 py-0.5 rounded text-[10px]",
    "bg-muted text-muted-foreground",
    "opacity-0 group-hover:opacity-100",
    "transition-opacity whitespace-nowrap pointer-events-none shadow"
  )}
>
  {label}
</span>

      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

// Floating animation config
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
const Dock = React.forwardRef(({ items, className }, ref) => {
  return (
    <div ref={ref} className={cn("fixed -bottom-24  w-full z-50 flex items-center justify-center p-2",
      "pointer-events-none", className)}>
      <div className="w-full max-w-3xl h-64 rounded-2xl flex items-center justify-center relative">
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          className={cn(
            "flex items-center  p-2 rounded-2xl",
            "backdrop-blur-lg border shadow-lg",
            "bg-background/90 border-border",
            "hover:shadow-xl  transition-shadow duration-300",
            "pointer-events-auto",
          )}
        >
          {items.map((item) => (
            <DockIconButton key={item.label}  onClick={item.onclick} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
  )
})  
Dock.displayName = "Dock"

export default Dock 
