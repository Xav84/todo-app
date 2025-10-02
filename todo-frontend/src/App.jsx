import React from "react";
import { TodoProvider } from "./contexts/TodoProvider";
import TodoForm from "./components/TodoForm";
import TodoListItems from "./components/TodoListItems";
import TodoFilter from "./components/TodoFilter";
import DeleteConfirmationModal from "./components/DeleteConfirmationModal";

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-800 font-sans">
        <div className="container mx-auto px-4">
          <DeleteConfirmationModal />
          <div className="flex justify-center">
            <div className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12">
              <h1 className="text-center mt-12 text-4xl md:text-5xl font-extrabold mb-8 text-white">
                My Todos
              </h1>
              <div className="mb-6 p-9 rounded-xl shadow-lg bg-gray-600">
                <TodoForm />
                <hr className="text-white mt-9"></hr>
                <TodoFilter />
                <TodoListItems />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
