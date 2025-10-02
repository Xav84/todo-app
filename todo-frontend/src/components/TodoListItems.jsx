import React from "react";
import { useTodoContext } from "../contexts/TodoProvider";
import TodoListItem from "./TodoListItem";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TodoListItems() {
  const { todos, loading, totalTodoCount, initialLoadComplete } =
    useTodoContext();

  // Animation when todo's are loading
  if (loading && totalTodoCount > 0) {
    return (
      <div className="mt-6">
        <Skeleton
          count={totalTodoCount}
          height={48}
          className="mb-2"
          baseColor="#2d2d2d52"
          highlightColor="#3A3A3A"
        />
      </div>
    );
  }

  return (
    <div className="mt-6">
      {todos.length === 0 && initialLoadComplete === true ? (
        <div className="p-4 text-center text-white rounded-xl bg-bg-card text-text-muted">
          No task at the moment, please add one!
        </div>
      ) : (
        <div className="space-y-3 mb-15">
          {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoListItems;
