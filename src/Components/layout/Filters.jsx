import React, { useContext, useState } from "react";
import ElasticSlider from "../Reactbits/InputRange";
import { Context } from "@/Context/TransactionContext";
import DropDown from "../Reactbits/Dropdown";

const Filters = ({ onSelectValue, selectedCategory, setSelectCategory }) => {
  const [selectValue, setSelectValue] = useState(100);
  const { maxValue, minValue } = useContext(Context);

  const handleSliderChange = (value) => {
    setSelectValue(value);
    onSelectValue(value);
  };

  return (
    <div className="flex items-center mx-30 gap-x-10">
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