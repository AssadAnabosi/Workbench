import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastRegion,
  ToastTitle,
} from "@ui-sdk/react/toast"
import { useTranslation } from "react-i18next"

/** The one place toasts appear; mounted once in `main.tsx`. */
const Toaster = () => {
  const { t } = useTranslation(undefined, { useSuspense: false })
  return (
    <ToastRegion
      side="bottom"
      align="end"
      aria-label={t("Notifications")}
      className="fixed inset-x-4 bottom-4 z-100 flex flex-col items-end gap-2 sm:inset-x-auto sm:end-4 sm:w-[356px]"
    >
      {() => (
        <Toast className="group/toast relative flex w-full items-start gap-3 rounded-(--radius) border border-border bg-popover p-4 text-sm text-popover-foreground shadow-lg transition-[opacity,translate] duration-200 data-starting-style:translate-y-2 data-starting-style:opacity-0 data-ending-style:opacity-0 data-[type=error]:border-destructive/40 data-[type=success]:border-primary/40">
          <span className="mt-0.5 shrink-0 text-muted-foreground group-data-[type=error]/toast:text-destructive group-data-[type=success]/toast:text-primary">
            <CircleCheckIcon className="hidden size-4 group-data-[type=success]/toast:block" />
            <OctagonXIcon className="hidden size-4 group-data-[type=error]/toast:block" />
            <TriangleAlertIcon className="hidden size-4 group-data-[type=warning]/toast:block" />
            <InfoIcon className="hidden size-4 group-data-[type=info]/toast:block" />
            <Loader2Icon className="hidden size-4 animate-spin group-data-[type=loading]/toast:block" />
          </span>
          <div className="grid flex-1 gap-1">
            <ToastTitle className="font-medium" />
            <ToastDescription className="text-muted-foreground" />
          </div>
          <ToastClose
            aria-label={t("Close")}
            className="shrink-0 rounded-xs opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
          >
            <XIcon className="size-4" />
          </ToastClose>
        </Toast>
      )}
    </ToastRegion>
  )
}

export { Toaster }
