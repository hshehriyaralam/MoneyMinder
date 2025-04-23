import React, { useContext, useState } from "react";
import ElasticSlider from "../Reactbits/InputRange";
import { Context } from "@/Context/TransactionContext";
import DropDown from "../Reactbits/Dropdown";
const Filters = ({ onSelectValue, selectedCategory, setSelectCategory }) => {
  const [selectValue, setSelectValue] = useState(100);
  const { maxValue, minValue } = useContext(Context);

  const handleSliderChange = (value) => {
    setSelectValue(value);
    onSelectValue(value);x
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 my-3      md:flex md:flex-row  md:justify-between">
      <ElasticSlider
        minValue={`${minValue}`}
        maxValue={`${maxValue}`}
        stepSize={10}
        defaultValue={`${minValue}`}
        onChange={handleSliderChange}
      />
      <DropDown
        selectedCategory={selectedCategory}
        setSelectCategory={setSelectCategory}
      />
    </div>
  );
};

export default Filters;