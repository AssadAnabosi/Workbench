import * as React from "react";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogContent as AlertDialogContentPrimitive,
  AlertDialogDescription as AlertDialogDescriptionPrimitive,
  AlertDialogTitle as AlertDialogTitlePrimitive,
  AlertDialogTrigger as AlertDialogTriggerPrimitive,
} from "@ui-sdk/react/alert-dialog";

import { cn } from "@/lib/utils";
import { asChildProps } from "@/lib/as-child";
import { buttonVariants } from "@/components/ui/button";

function AlertDialogTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogTriggerPrimitive> & {
  asChild?: boolean;
}) {
  return (
    <AlertDialogTriggerPrimitive
      {...props}
      {...asChildProps(asChild, children)}
    />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogBackdrop>) {
  return (
    <AlertDialogBackdrop
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-xs transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogContentPrimitive>) {
  return (
    <>
      <AlertDialogOverlay />
      <AlertDialogContentPrimitive
        className={cn(
          "fixed top-1/2 left-1/2 z-50 m-0 grid w-[min(32rem,calc(100vw-2rem))]! max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg transition-[opacity,scale] duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 sm:rounded-lg",
          className
        )}
        {...props}
      />
    </>
  );
}

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-start",
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogTitlePrimitive>) {
  return (
    <AlertDialogTitlePrimitive
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogDescriptionPrimitive>) {
  return (
    <AlertDialogDescriptionPrimitive
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/** The agreeing answer: closes the dialog reporting "confirm". */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogClose>) {
  return (
    <AlertDialogClose
      value="confirm"
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogClose>) {
  return (
    <AlertDialogClose
      value="cancel"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
