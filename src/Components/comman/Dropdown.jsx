import React, { useState } from "react";

const CategoryDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [categories, setCategories] = useState(["Salary"]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustomInput(true);
      setSelectedCategory("");
    } else {
      setSelectedCategory(value);
      setShowCustomInput(false);
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== "") {
      setCategories([...categories, customCategory]);
      setSelectedCategory(customCategory);
      setCustomCategory("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="w-[60%] space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        Select Category
      </label>
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-1 block w-full px-3 py-1.5 bg-transparent border-b border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#325788] focus:border-transparent text-sm appearance-none"
        >
          <option value="" disabled className="bg-[#09435a]">
            Choose a category
          </option>
          {categories.map((category, index) => (
            <option
              key={index}
              value={category}
              className="bg-[#09435a] text-white hover:bg-gray-700"
            >
              {category}
            </option>
          ))}
          <option
            value="custom"
            className="bg-[#09435a] text-white hover:bg-gray-700"
          >
            Add Custom Category
          </option>
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none">
          🔽
        </div>
      </div>

      {showCustomInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#325788] focus:border-transparent text-sm bg-transparent text-white"
          />
          <button
            onClick={handleAddCustomCategory}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
