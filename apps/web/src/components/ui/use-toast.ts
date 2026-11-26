import type { ReactNode } from "react";
import { toast as uiToast } from "@ui-sdk/react/toast";

type ToastOptions = {
  variant?: "default" | "success" | "destructive" | "inverse" | "primary";
  title?: ReactNode;
  description?: ReactNode;
  /** Milliseconds; leave out for the default. */
  duration?: number;
};

/**
 * `toast({ variant, title, description })`, shown by the UI SDK's toast region. The `Toaster` is
 * mounted once in `main.tsx`.
 */
function toast({
  variant = "default",
  title,
  description,
  duration,
}: ToastOptions) {
  const message = title ?? description;
  const options = {
    description: title ? description : undefined,
    duration,
  } as Parameters<typeof uiToast>[1];
  const text = message as string;
  if (variant === "success") return uiToast.success(text, options);
  if (variant === "destructive") return uiToast.error(text, options);
  return uiToast(text, options);
}

function useToast() {
  return { toast };
}

export { useToast, toast };
