import * as React from "react";
import { Switch as SwitchPrimitive, SwitchThumb } from "@ui-sdk/react/switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive>) {
  return (
    <SwitchPrimitive
      className={cn(
        "peer focus-visible:ring-ring focus-visible:ring-offset-background data-checked:bg-primary bg-input inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchThumb className="bg-background pointer-events-none ms-0 block h-5 w-5 rounded-full shadow-lg ring-0 transition-[margin-inline-start] in-data-checked:ms-5" />
    </SwitchPrimitive>
  );
}

export { Switch };
