import * as React from "react"
import { cn } from "@/lib/utils"
import { asChildProps } from "@/lib/as-child"
import {
  Drawer as DrawerPrimitive,
  DrawerBackdrop,
  DrawerClose as DrawerClosePrimitive,
  DrawerContent as DrawerContentPrimitive,
  DrawerDescription as DrawerDescriptionPrimitive,
  DrawerTitle as DrawerTitlePrimitive,
  DrawerTrigger as DrawerTriggerPrimitive,
} from "@ui-sdk/react/drawer"

const Drawer = DrawerPrimitive

function DrawerTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DrawerTriggerPrimitive> & { asChild?: boolean }) {
  return (
    <DrawerTriggerPrimitive
      data-slot="drawer-trigger"
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function DrawerClose({
  asChild,
  children,
  ...props
}: React.ComponentProps<typeof DrawerClosePrimitive> & { asChild?: boolean }) {
  return (
    <DrawerClosePrimitive
      data-slot="drawer-close"
      {...props}
      {...asChildProps(asChild, children)}
    />
  )
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerBackdrop>) {
  return (
    <DrawerBackdrop
      data-slot="drawer-overlay"
      className={cn("bg-black/50", className)}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerContentPrimitive>) {
  return (
    <>
      <DrawerOverlay />
      <DrawerContentPrimitive
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content flex h-auto flex-col bg-background",
          "data-[side=top]:max-h-[80vh] data-[side=top]:rounded-b-lg data-[side=top]:border-b",
          "data-[side=bottom]:max-h-[min(80vh,calc(var(--visual-viewport-height,100vh)-1rem))] data-[side=bottom]:pb-[env(safe-area-inset-bottom)] data-[side=bottom]:rounded-t-lg data-[side=bottom]:border-t",
          "data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:sm:max-w-sm",
          "data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-muted group-data-[side=bottom]/drawer-content:block" />
        {children as React.ReactNode}
      </DrawerContentPrimitive>
    </>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-0.5 p-4 group-data-[side=bottom]/drawer-content:text-center group-data-[side=top]/drawer-content:text-center md:gap-1.5 md:text-start",
        className
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerTitlePrimitive>) {
  return (
    <DrawerTitlePrimitive
      data-slot="drawer-title"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerDescriptionPrimitive>) {
  return (
    <DrawerDescriptionPrimitive
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
