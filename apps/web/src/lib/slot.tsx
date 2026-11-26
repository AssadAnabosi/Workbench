import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Renders its single child element with this component's props merged in (class names joined,
 * handlers chained, refs combined). Stands in for the `asChild` pattern in components that are
 * not built on a UI SDK part.
 */
const Slot = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
>(({ children, ...slotProps }, forwardedRef) => {
  if (!React.isValidElement<Record<string, any>>(children)) return null;
  const childProps = children.props;
  const merged: Record<string, any> = { ...slotProps, ...childProps };
  for (const key of Object.keys(slotProps)) {
    const fromSlot = (slotProps as any)[key];
    const fromChild = childProps[key];
    if (/^on[A-Z]/.test(key) && fromSlot && fromChild) {
      merged[key] = (...args: unknown[]) => {
        fromChild(...args);
        fromSlot(...args);
      };
    }
  }
  if (slotProps.className || childProps.className)
    merged.className = cn(slotProps.className, childProps.className);
  if (slotProps.style || childProps.style)
    merged.style = { ...slotProps.style, ...childProps.style };
  const childRef = (children as any).ref ?? childProps.ref;
  merged.ref = forwardedRef
    ? (node: HTMLElement | null) => {
        for (const ref of [forwardedRef, childRef]) {
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<unknown>).current = node;
        }
      }
    : childRef;
  return React.cloneElement(children, merged);
});
Slot.displayName = "Slot";

export { Slot };
