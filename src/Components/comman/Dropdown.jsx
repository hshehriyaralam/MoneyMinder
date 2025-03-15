import React, { useState } from "react";

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [categories, setCategories] = useState([
    "Salary",
    "Freelance",
    "Investment",
  ]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setShowCustomInput(true); // Show custom input field
      setSelectedCategory(""); // Reset selected category
    } else {
      setSelectedCategory(value);
      setShowCustomInput(false); // Hide custom input field
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== "") {
      setCategories([...categories, customCategory]); // Add custom category to the list
      setSelectedCategory(customCategory); // Set the custom category as selected
      setCustomCategory(""); // Clear the custom input field
      setShowCustomInput(false); // Hide custom input field
    }
  };

  return (
    <div className="w-[60%] space-y-2">
      {/* Dropdown Label */}
      <label className="block text-sm font-medium text-gray-700">
        Select Category
      </label>

      {/* Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
      >
        <option value="" disabled>
          Choose a category
        </option>
        {/* Predefined Categories */}
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
        {/* Custom Category Option */}
        <option value="custom">Add Custom Category</option>
      </select>

      {/* Custom Category Input */}
      {showCustomInput && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
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