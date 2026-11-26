import * as React from "react";
import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@ui-sdk/react/scroll-area";

import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive>) {
  return (
    <ScrollAreaPrimitive
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaViewport className="h-full max-h-72 w-[99%] rounded-[inherit]">
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollBar />
    </ScrollAreaPrimitive>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      orientation={orientation}
      className={cn(
        "flex touch-none transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-s border-s-transparent p-px",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-px",
        className
      )}
      {...props}
    >
      <ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
    </ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
