import React, { useContext, useMemo, useState } from "react";
import ElasticSlider from "../Reactbits/InputRange";
import DropDown from "../Reactbits/Dropdown";
 const Filters = ({ onSelectValue, selectedCategory, setSelectCategory,transactions })  => {

  const [selectValue, setSelectValue] = useState(100);
  console.log("selectValue", selectValue)

  const handleSliderChange = (value) => {
    setSelectValue(value);
    onSelectValue(value);
  };

  const  maxValue = useMemo(() => { return transactions.length > 0 ? Math.max(...transactions.map(t => Number(t.amount))) : 0; }, [transactions]);

  const  minValue = useMemo(() => { return transactions.length > 0 ? Math.min(...transactions.map(t => Number(t.amount))) : 0; }, [transactions]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 gap-x-10  my-3 md:flex md:flex-row  md:justify-end">
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
}

export default React.memo(Filters);