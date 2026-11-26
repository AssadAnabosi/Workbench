import * as React from "react";
import {
  HoverCard as HoverCardPrimitive,
  HoverCardContent as HoverCardContentPrimitive,
  HoverCardTrigger as HoverCardTriggerPrimitive,
} from "@ui-sdk/react/hover-card";

import { cn } from "@/lib/utils";
import { asChildProps } from "@/lib/as-child";

/** `openDelay` is what the previous component called `delay`. */
function HoverCard({
  openDelay,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive> & { openDelay?: number }) {
  return <HoverCardPrimitive delay={openDelay} {...props} />;
}

function HoverCardTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof HoverCardTriggerPrimitive> & {
  asChild?: boolean;
}) {
  return (
    <HoverCardTriggerPrimitive {...props} {...asChildProps(asChild, children)} />
  );
}

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardContentPrimitive>) {
  return (
    <HoverCardContentPrimitive
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-64 origin-(--transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden transition-[opacity,scale] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
