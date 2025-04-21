import { useEffect, useRef, useState } from "react";

export default function ElasticSlider({
  defaultValue = 100,
  minValue = 0,
  maxValue = 1000,
  className = "",
  stepSize = 1,
  leftIcon = <></>,
  rightIcon = <></>,
  onChange = () => {},
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-48 ${className}`}>
      <Slider
        defaultValue={defaultValue}
        minValue={minValue}
        maxValue={maxValue}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onChange={onChange}
      />
    </div>
  );
}

function Slider({
  defaultValue,
  minValue,
  maxValue,
  stepSize,
  leftIcon,
  rightIcon,
  onChange,
}) {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <input
        ref={sliderRef}
        type="range"
        min={minValue}
        max={maxValue}
        step={stepSize}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-cyan-900 rounded-lg appearance-none cursor-pointer"
      />
      <p className="text-gray-200 text-sm font-medium">{value}</p>
     </div>
  );
}
