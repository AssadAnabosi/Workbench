import * as React from "react";
import {
  Popover,
  PopoverClose,
  PopoverContent as PopoverContentPrimitive,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger as PopoverTriggerPrimitive,
} from "@ui-sdk/react/popover";

import { cn } from "@/lib/utils";
import { asChildProps } from "@/lib/as-child";

function PopoverTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof PopoverTriggerPrimitive> & {
  asChild?: boolean;
}) {
  return (
    <PopoverTriggerPrimitive {...props} {...asChildProps(asChild, children)} />
  );
}

function PopoverContent({
  className,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  collisionPadding = 8,
  ...props
}: React.ComponentProps<typeof PopoverContentPrimitive>) {
  return (
    <PopoverContentPrimitive
      align={align}
      side={side}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(
        "z-50 w-72 origin-(--transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden transition-[opacity,scale] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverTitle,
  PopoverDescription,
};
