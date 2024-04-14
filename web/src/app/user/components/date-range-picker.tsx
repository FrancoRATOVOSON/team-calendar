import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  onChange: (params: { start: Date; end?: Date }) => void;
  values?: {
    start: Date;
    end?: Date;
  };
}

export function DateRangePicker({
  className,
  onChange,
  values
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !values && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {values?.start ? (
              values.end ? (
                <>
                  {format(values.start, "LLL dd, y")} -{" "}
                  {format(values.end, "LLL dd, y")}
                </>
              ) : (
                format(values.start, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={values?.start}
            selected={{ from: values?.start, to: values?.end }}
            onSelect={(value) => {
              if (value && value.from)
                onChange({
                  start: value.from,
                  end: value.to
                });
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
