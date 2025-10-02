import React from "react";
import { useTodoContext } from "../contexts/TodoProvider";

function DeleteConfirmationModal() {
  const {
    isDeleteModalOpen,
    closeDeleteModal,
    confirmDelete,
    todoToDeleteId,
    allTodos,
  } = useTodoContext();

  const todoToConfirm = allTodos.find((t) => t.id === todoToDeleteId);
  const todoText = todoToConfirm ? todoToConfirm.text : "la tâche sélectionnée";

  // If the modal is not open, do not display anything
  if (!isDeleteModalOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={closeDeleteModal} // Close by clicking outside
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full transform transition-all"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <h2 className="text-xl font-bold mb-4 text-text-light">
          Confirmer la suppression
        </h2>
        <p className="mb-6">
          Êtes-vous sûr de vouloir supprimer la tâche:
          <span className="font-bold">{" " + todoText + " "}</span>? Cette
          action est irréversible.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 bg-gray-500 border text-white border-gray-600 rounded-lg"
          >
            Annuler
          </button>

          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white font-bold border border-gray-600 rounded-lg hover:bg-red-600 transition duration-150"
          >
            Confirmer la suppression
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
