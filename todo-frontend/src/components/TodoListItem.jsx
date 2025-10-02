import React, { useState, useEffect } from "react";
import {
  FaTrash,
  FaCheckSquare,
  FaRegSquare,
  FaPencilAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useTodoContext } from "../contexts/TodoProvider";

function TodoListItem({ todo }) {
  const {
    openDeleteModal,
    handleToggleComplete,
    handleUpdateTodo,
    startEditing,
    stopEditing,
    editingTodoId,
  } = useTodoContext();

  const isEditing = editingTodoId === todo.id;
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const handleStartEdit = () => {
    setEditText(todo.text);
    startEditing(todo.id);
  };

  const handleSave = () => {
    if (editText.trim() !== todo.text && editText.trim() !== "") {
      handleUpdateTodo(todo.id, editText.trim());
    }
    stopEditing();
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    stopEditing();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // Conditional Classes Based on Status
  const cardClasses = todo.completed
    ? "bg-bg-card bg-gray-400 transition duration-200" // Card greyed out if completed
    : "bg-white hover:bg-gray-200 transition duration-200";

  const titleClasses = todo.completed
    ? "text-text-muted line-through" // Strikethrough and greyed out text
    : "";

  // Disable actions if another task is editing
  const isDisabled = editingTodoId !== null && editingTodoId !== todo.id;

  return (
    <div
      className={`flex text-gray-700 justify-between items-start p-5 rounded-xl shadow-md ${cardClasses}`}
    >
      {/* Checkbox */}
      <button
        onClick={() => !isEditing && handleToggleComplete(todo.id)}
        disabled={isEditing || isDisabled}
        className={`mt-1 mr-3 p-0 transition duration-150 ${
          isDisabled ? "opacity-50" : ""
        }`}
        aria-label={
          todo.completed
            ? "Marquer comme non complété"
            : "Marquer comme complété"
        }
      >
        {todo.completed ? (
          <FaCheckSquare className="text-accent" size={24} />
        ) : (
          <FaRegSquare
            className="text-text-muted hover:text-accent"
            size={24}
          />
        )}
      </button>

      <div className={`flex-grow pr-4 ${isDisabled ? "opacity-50" : ""}`}>
        {isEditing ? (
          // --- EDIT MODE: Input field ---
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full p-2 text-lg font-normal bg-white text-gray-800 border-2 border-accent rounded-lg 
                       focus:ring-accent focus:border-accent transition duration-150"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          // --- READING MODE: Displayed Text ---
          <div>
            <span className={`text-xl font-bold break-words ${titleClasses}`}>
              {todo.text}
            </span>
            {/* If desc is present */}
            {todo.desc && (
              <p className="text-sm italic text-text-light mt-1">{todo.desc}</p>
            )}
          </div>
        )}
      </div>

      {/* ---- Todo modifying section ---- */}
      <div
        className={`flex space-x-3 items-center ml-2 ${
          isDisabled ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {isEditing ? (
          // --- BUTTONS IN EDIT MODE ---
          <>
            <button
              onClick={handleSave}
              disabled={editText.trim() === ""}
              className="p-2 bg-green-500 text-white rounded-lg hover:bg-accent-hover transition duration-150 disabled:opacity-50"
              aria-label="Sauvegarder la modification"
            >
              <FaCheck className="w-4 h-4" />
            </button>

            <button
              onClick={handleCancelEdit}
              className="p-2 text-white bg-gray-500 rounded-lg hover:bg-red-600 transition duration-200"
              aria-label="Annuler la modification"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </>
        ) : (
          // --- BUTTONS IN READING MODE ---
          <>
            <button
              onClick={handleStartEdit}
              className="p-2 text-text-muted hover:text-accent transition duration-150"
              aria-label="Modifier la tâche"
            >
              <FaPencilAlt className="w-4 h-4" />
            </button>

            <button
              onClick={() => openDeleteModal(todo.id)}
              className="p-2 text-text-muted hover:text-danger transition duration-150"
              aria-label="Supprimer la tâche"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoListItem;
