import { cn } from "@/lib/utils";
import {
  DateRangeField,
  type DateRangeValue,
} from "@/components/ui/date-picker";

type DatePickerWithRangeProps = {
  className?: string;
  date: {
    from: string | null | undefined;
    to?: string | null | undefined;
  };
  setDate: (range: DateRangeValue | undefined) => void;
};

/** A date range for a list page's filter: a popover on desktop, a sheet on a small touch screen. */
export default function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid w-full gap-2", className)}>
      <DateRangeField
        value={date}
        onChange={setDate}
        fromYear={2019}
        toYear={new Date().getFullYear() + 10}
      />
    </div>
  );
}
