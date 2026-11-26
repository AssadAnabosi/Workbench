"use client"

import * as React from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { asChildProps } from "@/lib/as-child"
import { XIcon } from "lucide-react"
import {
  Drawer as SheetPrimitive,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@ui-sdk/react/drawer"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive>) {
  return <SheetPrimitive data-slot="sheet" {...props} />
}

function SheetTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DrawerTrigger> & { asChild?: boolean }) {
  return (
    <DrawerTrigger
      data-slot="sheet-trigger"
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function SheetClose({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DrawerClose> & { asChild?: boolean }) {
  return (
    <DrawerClose
      data-slot="sheet-close"
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

/** `side` is the physical edge the sheet slides in from (the Drawer's own `side` goes on the root). */
function SheetContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DrawerContent> & {
  showCloseButton?: boolean
}) {
  const { t } = useTranslation(undefined, { useSuspense: false })
  return (
    <>
      <DrawerBackdrop data-slot="sheet-overlay" className="bg-black/50" />
      <DrawerContent
        data-slot="sheet-content"
        className={cn(
          "flex flex-col gap-4 bg-background shadow-lg",
          "data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm",
          "data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:sm:max-w-sm",
          "data-[side=top]:h-auto data-[side=top]:border-b",
          "data-[side=bottom]:h-auto data-[side=bottom]:border-t",
          className
        )}
        {...props}
      >
        {children as React.ReactNode}
        {showCloseButton && (
          <DrawerClose className="absolute top-4 end-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
            <XIcon className="size-4" />
            <span className="sr-only">{t("Close")}</span>
          </DrawerClose>
        )}
      </DrawerContent>
    </>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerTitle>) {
  return (
    <DrawerTitle
      data-slot="sheet-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerDescription>) {
  return (
    <DrawerDescription
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
