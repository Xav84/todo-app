import React, { useState } from "react";
import { useTodoContext } from "../contexts/TodoProvider";

function TodoForm() {
  const { handleAddTodo, editingTodoId } = useTodoContext();
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescriptionValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddTodo(inputValue, descriptionValue);
      setInputValue("");
      setDescriptionValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.5fr_1fr] gap-4">
        <div className="flex flex-col">
          <label className="text-white font-bold mb-1">Title</label>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            disabled={editingTodoId !== null}
            className="flex-1 border border-gray-600 bg-white text-gray-800 placeholder-gray-500 rounded-lg p-3 text-lg 
                       focus:ring-accent focus:border-accent transition duration-150 ease-in-out disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white font-bold mb-1">Description</label>
          <input
            type="description"
            value={descriptionValue}
            onChange={handleDescriptionChange}
            disabled={editingTodoId !== null}
            className="flex-1 border border-gray-600 bg-white text-gray-800 placeholder-gray-500 rounded-lg p-3 text-lg 
                       focus:ring-accent focus:border-accent transition duration-150 ease-in-out disabled:opacity-50"
          />
        </div>
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            disabled={editingTodoId !== null || inputValue.trim() === ""}
            className="bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md opacity-90 
                     hover:opacity-100 transition duration-150 ease-in-out disabled:opacity-50 h-13"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
