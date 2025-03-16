"use client";;
import React, { forwardRef, useCallback } from "react";
import { useTimescape } from "timescape/react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// @source: https://github.com/dan-lee/timescape?tab=readme-ov-file

const timePickerInputBase =
  "p-1 inline tabular-nums h-fit border-none outline-none select-none content-box caret-transparent rounded-sm min-w-8 text-center focus:bg-foreground/20 focus-visible:ring-0 focus-visible:outline-none text-black";
const timePickerSeparatorBase = "text-xs text-gray-900";

const DEFAULTS = [["months", "days", "years"], ["hours", "minutes", "am/pm"]];

const INPUT_PLACEHOLDERS = {
  months: "MM",
  days: "DD",
  years: "YYYY",
  hours: "HH",
  minutes: "MM",
  seconds: "SS",
  "am/pm": "AM/PM",
};

/**
 * Date time picker Docs: {@link: https://shadcn-extension.vercel.app/docs/otp-input}
 */

const DatetimeGrid = forwardRef((
  {
    format,
    className,
    timescape,
    placeholders
  },
  ref,
) => {
  return (
    (<div
      className={cn(
        "flex items-center w-[60%] p-1  border-b border-gray-300 rounded-md gap-0.5 selection:bg-transparent selection:text-foreground hover:border hover:border-[#325788] focus:border  focus:border-[#325788] ",
        className
      )}
      {...timescape.getRootProps()}
      ref={ref}>
      {!!format?.length
        ? format.map((group, i) => (
            <React.Fragment key={i === 0 ? "dates" : "times"}>
              {!!group?.length
                ? group.map((unit, j) => (
                    <React.Fragment key={unit}>
                      <Input
                        className={cn(timePickerInputBase, "min-w-8 text-black text-sm", {
                          "min-w-12": unit === "years",
                          "bg-foreground/15": unit === "am/pm",
                        })}
                        {...timescape.getInputProps(unit)}
                        placeholder={placeholders[unit]} />
                      {i === 0 && j < group.length - 1 ? (
                        // date separator
                        (<span className={timePickerSeparatorBase}>/</span>)
                      ) : (
                        j < group.length - 2 && (
                          // time separator
                          (<span className={timePickerSeparatorBase}>:</span>)
                        )
                      )}
                    </React.Fragment>
                  ))
                : null}
              {format[1]?.length && !i ? (
                // date-time separator - only if both date and time are present
                (<span className={cn(timePickerSeparatorBase, "opacity-30 text-xl")}>|
                                    </span>)
              ) : null}
            </React.Fragment>
          ))
        : null}
    </div>)
  );
});

DatetimeGrid.displayName = "DatetimeGrid";

const DEFAULT_TS_OPTIONS = {
  date: new Date(),
  hour12: true,
};
export const DatetimePicker = forwardRef((
  {
    value,
    format = DEFAULTS,
    placeholders,
    dtOptions = DEFAULT_TS_OPTIONS,
    onChange,
    className,
  },
  ref,
) => {
  const handleDateChange = useCallback((nextDate) => {
    onChange ? onChange(nextDate) : console.log(nextDate);
  }, [onChange]);
  const timescape = useTimescape({
    ...dtOptions,
    ...(value && { date: value }),
    onChangeDate: handleDateChange,
  });
  return (
    (<DatetimeGrid
      format={format}
      className={className}
      timescape={timescape}
      placeholders={placeholders ?? INPUT_PLACEHOLDERS}
      ref={ref} />)
  );
});

DatetimePicker.displayName = "DatetimePicker";