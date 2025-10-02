import React from "react";
import { useTodoContext } from "../contexts/TodoProvider";

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Todo", value: "active" },
  { label: "Done", value: "completed" },
];

function TodoFilter() {
  const { filterStatus, setFilterStatus } = useTodoContext();

  const handleFilterChange = (newFilterValue) => {
    setFilterStatus(newFilterValue);
  };

  return (
    <div className="flex rounded-md overflow-hidden border border-gray-600 w-fit mt-9">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleFilterChange(option.value)}
          className={` text-center text-gray-700 font-bold py-2 w-20 transition duration-200 ease-in-out ${
            option.value === 0
              ? "bg-gray-300 text-lighter shadow-md hover:bg-accent-hover"
              : ""
          } ${
            filterStatus === option.value
              ? "bg-gray-300 text-lighter shadow-md"
              : "bg-white text-text-muted hover:text-text-light hover:bg-gray-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
