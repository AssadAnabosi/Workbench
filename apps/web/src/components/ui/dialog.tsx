import * as React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogClose as DialogClosePrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogTrigger as DialogTriggerPrimitive,
} from "@ui-sdk/react/dialog";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { asChildProps } from "@/lib/as-child";

function DialogTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DialogTriggerPrimitive> & {
  asChild?: boolean;
}) {
  return (
    <DialogTriggerPrimitive {...props} {...asChildProps(asChild, children)} />
  );
}

function DialogClose({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DialogClosePrimitive> & { asChild?: boolean }) {
  return (
    <DialogClosePrimitive {...props} {...asChildProps(asChild, children)} />
  );
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogBackdrop>) {
  return (
    <DialogBackdrop
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-xs transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogContentPrimitive>) {
  const { t } = useTranslation();
  return (
    <>
      <DialogOverlay />
      <DialogContentPrimitive
        className={cn(
          "fixed top-1/2 left-1/2 z-50 m-0 grid w-[min(32rem,calc(100vw-2rem))]! max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg transition-[opacity,scale] duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children as React.ReactNode}
        <DialogClosePrimitive className="absolute inset-e-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">{t("Close")}</span>
        </DialogClosePrimitive>
      </DialogContentPrimitive>
    </>
  );
}

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-start",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogTitlePrimitive>) {
  return (
    <DialogTitlePrimitive
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescriptionPrimitive>) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
