import { useState } from "react";

const categories = [
  "All",
  "Technology",
  "Health",
  "Travel",
  "Finance",
  "Others",
];

const FilterSidebar = ({ onApply }) => {
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("All");

  const handleApply = () => {
    onApply({
      author: author.trim(),
      category: category,
    });
  };

  const handleClear = () => {
    setAuthor("");
    setCategory("All");
    onApply({ author: "", category: "All" });
  };

  return (
    <div className="p-4 md:p-6 space-y-4 h-full">
      <h2 className="text-xl font-semibold text-gray-800">Filters</h2>

      {/* Author Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleApply}
          className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
