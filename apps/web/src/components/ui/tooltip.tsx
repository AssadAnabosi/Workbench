import * as React from "react"
import { cn } from "@/lib/utils"
import { asChildProps } from "@/lib/as-child"
import {
  Tooltip,
  TooltipArrow,
  TooltipContent as TooltipContentPrimitive,
  TooltipTrigger as TooltipTriggerPrimitive,
} from "@ui-sdk/react/tooltip"

function TooltipTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof TooltipTriggerPrimitive> & {
  asChild?: boolean
}) {
  return (
    <TooltipTriggerPrimitive
      data-slot="tooltip-trigger"
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipContentPrimitive>) {
  return (
    <TooltipContentPrimitive
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-fit origin-(--transform-origin) rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background transition-[opacity,scale] duration-150 data-instant:transition-none data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      {children as React.ReactNode}
      <TooltipArrow className="z-50 size-2.5 rotate-45 rounded-[2px] bg-foreground fill-foreground" />
    </TooltipContentPrimitive>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }
