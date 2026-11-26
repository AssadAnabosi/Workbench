import * as React from "react";
import {
  Radio,
  RadioGroup as RadioGroupPrimitive,
  RadioIndicator,
} from "@ui-sdk/react/radio";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive>) {
  return (
    <RadioGroupPrimitive className={cn("grid gap-2", className)} {...props} />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof Radio>) {
  return (
    <Radio
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioIndicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioIndicator>
    </Radio>
  );
}

export { RadioGroup, RadioGroupItem };
