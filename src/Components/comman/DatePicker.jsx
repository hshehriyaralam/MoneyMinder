import React from "react";
import { DatePicker } from "antd";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <DatePicker
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      className="w-full"
      format="DD/MM/YYYY" // Customize the date format
      placeholder="Pick a date"
    />
  );
};

export default CustomDatePicker;