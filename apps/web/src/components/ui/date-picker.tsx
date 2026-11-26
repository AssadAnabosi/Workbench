import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  CalendarDay,
  CalendarGrid,
  CalendarMonthSelect,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearSelect,
  DatePicker,
  DatePickerContent,
  DatePickerInput,
  DatePickerTrigger,
} from "@ui-sdk/react/date-picker";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/use-locale";
import { useIsDesktop } from "@/hooks/use-breakpoint";

/** A day as the picker wants it: `2026-10-16`, with no time or time zone. */
const toIso = (value: Date | string | null | undefined) => {
  if (!value) return null;
  const date = typeof value === "string" ? new Date(value) : value;
  return Number.isNaN(date.getTime()) ? null : format(date, "yyyy-MM-dd");
};

/** The picker's day as a Date at local midnight. */
const fromIso = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/** Saturday: the app's week starts there. */
const WEEK_STARTS_ON = 6;

const field =
  "h-11 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-destructive/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:h-9 md:text-sm dark:bg-input/30";

const navButton =
  "inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-input bg-transparent text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-50";

const monthSelect =
  "h-7 rounded-md border-none bg-transparent px-1 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50";

type Bounds = {
  /** First selectable year. */
  fromYear?: number;
  /** Last selectable year. */
  toYear?: number;
};

type CommonProps = Bounds & {
  className?: string;
  disabled?: boolean;
  id?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-describedby"?: string;
};

function useBounds({ fromYear, toYear }: Bounds) {
  return {
    min: fromYear ? `${fromYear}-01-01` : undefined,
    max: toYear ? `${toYear}-12-31` : undefined,
  };
}

function CalendarPopup({
  months,
  anchor,
}: {
  months: 1 | 2;
  anchor: HTMLElement | null;
}) {
  const { t } = useTranslation();
  const grids = Array.from({ length: months }, (_, offset) => offset);
  return (
    <DatePickerContent
      anchor={anchor}
      align="start"
      sideOffset={4}
      collisionPadding={16}
      className={cn(
        "z-50 origin-(--transform-origin) rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-hidden transition-[opacity,scale] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none",
        "data-[presentation=sheet]:w-full data-[presentation=sheet]:rounded-b-none data-[presentation=sheet]:rounded-t-xl data-[presentation=sheet]:border-x-0 data-[presentation=sheet]:border-b-0 data-[presentation=sheet]:pb-[max(env(safe-area-inset-bottom),0.75rem)] data-[presentation=sheet]:shadow-lg data-[presentation=sheet]:transition-none"
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-1">
          <CalendarPrevious
            aria-label={t("Previous month")}
            className={navButton}
          >
            <ChevronLeftIcon className="rtl-flip size-4" aria-hidden="true" />
          </CalendarPrevious>
          <div className="flex items-center gap-1">
            <CalendarMonthSelect className={monthSelect} />
            <CalendarYearSelect className={monthSelect} />
          </div>
          <CalendarNext aria-label={t("Next month")} className={navButton}>
            <ChevronRightIcon className="rtl-flip size-4" aria-hidden="true" />
          </CalendarNext>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          {grids.map((offset) => (
            <CalendarGrid
              key={offset}
              offset={offset}
              className="w-full border-collapse select-none"
            >
              <CalendarWeekdays>
                {(index) => (
                  <CalendarWeekday
                    index={index}
                    className="size-9 rounded-md text-[0.8rem] font-normal text-muted-foreground in-data-[presentation=sheet]:h-9 in-data-[presentation=sheet]:w-auto"
                  />
                )}
              </CalendarWeekdays>
              <CalendarWeeks>
                {(cell) => (
                  <CalendarDay
                    value={cell.date}
                    className={cn(
                      "size-9 cursor-default rounded-md p-0 text-center text-sm font-normal outline-none",
                      "in-data-[presentation=sheet]:h-11 in-data-[presentation=sheet]:w-auto",
                      "hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      "data-today:bg-warning-foreground data-today:text-warning",
                      "data-outside:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-unavailable:opacity-50",
                      "data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary data-selected:hover:text-primary-foreground",
                      "data-range-middle:rounded-none data-range-middle:bg-accent data-range-middle:text-accent-foreground data-preview:bg-accent/60",
                      "data-range-start:rounded-s-md data-range-start:rounded-e-none data-range-end:rounded-e-md data-range-end:rounded-s-none"
                    )}
                  />
                )}
              </CalendarWeeks>
            </CalendarGrid>
          ))}
        </div>
      </div>
    </DatePickerContent>
  );
}

function PickerTrigger() {
  const { t } = useTranslation();
  return (
    <DatePickerTrigger
      aria-label={t("Pick a date")}
      className="absolute inset-e-1 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-50 md:size-7"
    >
      <CalendarIcon className="size-4" aria-hidden="true" />
    </DatePickerTrigger>
  );
}

type DateFieldProps = CommonProps & {
  value: Date | string | null | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
};

/**
 * One day. Typed, or picked from a calendar that is a popover on desktop and a sheet on a small
 * touch screen (`presentation="auto"`).
 */
function DateField({
  value,
  onChange,
  className,
  disabled,
  id,
  fromYear,
  toYear,
  placeholder,
  ...aria
}: DateFieldProps) {
  const { t } = useTranslation();
  const { numberLocale } = useLocale();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const bounds = useBounds({ fromYear, toYear });
  return (
    <DatePicker
      presentation="auto"
      locale={numberLocale}
      weekStartsOn={WEEK_STARTS_ON}
      disabled={disabled}
      value={toIso(value)}
      onValueChange={(next) =>
        onChange(typeof next === "string" ? fromIso(next) : undefined)
      }
      {...bounds}
    >
      <div
        ref={setAnchor}
        className={cn("relative flex w-[240px] items-center", className)}
      >
        <DatePickerInput
          id={id}
          aria-label={aria["aria-describedby"] ? undefined : t("Pick a date")}
          placeholder={placeholder}
          className={cn(field, "pe-10")}
          {...aria}
        />
        <PickerTrigger />
      </div>
      <CalendarPopup months={1} anchor={anchor} />
    </DatePicker>
  );
}

export type DateRangeValue = { from?: Date; to?: Date };

type DateRangeFieldProps = CommonProps & {
  value: { from?: string | Date | null; to?: string | Date | null };
  onChange: (range: DateRangeValue | undefined) => void;
};

/** A start and an end day; two months side by side where there is room. */
function DateRangeField({
  value,
  onChange,
  className,
  disabled,
  fromYear,
  toYear,
}: DateRangeFieldProps) {
  const { t } = useTranslation();
  const { numberLocale } = useLocale();
  const isDesktop = useIsDesktop();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const bounds = useBounds({ fromYear, toYear });
  const start = toIso(value.from);
  const end = toIso(value.to);
  return (
    <DatePicker
      mode="range"
      presentation="auto"
      months={isDesktop ? 2 : 1}
      locale={numberLocale}
      weekStartsOn={WEEK_STARTS_ON}
      disabled={disabled}
      value={start && end ? [start, end] : null}
      onValueChange={(next) =>
        onChange(
          Array.isArray(next)
            ? { from: fromIso(next[0]), to: fromIso(next[1]) }
            : undefined
        )
      }
      {...bounds}
    >
      <div
        ref={setAnchor}
        className={cn(
          "relative flex w-full items-center gap-1 md:w-[335px]",
          className
        )}
      >
        <DatePickerInput
          aria-label={t("Start date")}
          className={cn(field, "text-center")}
        />
        <span className="text-muted-foreground" aria-hidden="true">
          –
        </span>
        <DatePickerInput
          end
          aria-label={t("End date")}
          className={cn(field, "pe-10 text-center")}
        />
        <PickerTrigger />
      </div>
      <CalendarPopup months={isDesktop ? 2 : 1} anchor={anchor} />
    </DatePicker>
  );
}

export { DateField, DateRangeField };
