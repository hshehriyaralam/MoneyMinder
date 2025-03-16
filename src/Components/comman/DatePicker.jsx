import React from "react";
import { DatetimePicker } from "@/components/ui/datetime-picker";

const DatetimePickerDemo = () => {
  return (
    <DatetimePicker
      format={[
        [ "days", "months",  "years"],
        ["hours", "minutes", "am/pm"],
      ]}
    />
  );
};

export default  DatetimePickerDemo ;


