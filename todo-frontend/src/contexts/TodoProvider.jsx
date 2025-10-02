import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { TodoReducer, initialTodoState } from "../reducers/TodoReducer";

const TodoContext = createContext();

const API_URL = "http://localhost:3001/todos";
// Allows the skeleton to be displayed for a minimum duration of time
const MIN_LOADING_TIME = 1000;

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialTodoState);
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    setMinimumTimeElapsed(false); // Resets for each load

    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, MIN_LOADING_TIME);

    // Retrieve the total number of tasks
    fetch(`${API_URL}/count`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "SET_TOTAL_TODO_COUNT", payload: data.count });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du count des tâches:", error);
        dispatch({ type: "SET_TOTAL_TODO_COUNT", payload: 5 }); // Fallback
      });

    // Retrieve all tasks
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "SET_TODOS", payload: data });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des tâches:", error);
        // In case of error stop the spinner and not wait for the MIN_LOADING_TIME
        dispatch({ type: "SET_LOADING", payload: false });
        setMinimumTimeElapsed(true);
      });

    return () => clearTimeout(timer);
  }, []);

  const handleAddTodo = (text, desc = "") => {
    const newTodo = { text, desc };
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch({ type: "ADD_TODO", payload: data }))
      .catch((error) =>
        console.error("Erreur lors de l'ajout de la tâche:", error)
      );
  };

  const handleDeleteTodo = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: "DELETE_TODO", payload: id });
        } else {
          console.error(
            "Erreur lors de la suppression, statut:",
            response.status
          );
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression de la tâche:", error)
      );
  };

  // ---- Delete confirmation modal ----
  const openDeleteModal = (id) => {
    dispatch({ type: "SET_CONFIRM_DELETE_ID", payload: id });
  };

  const closeDeleteModal = () => {
    dispatch({ type: "CLEAR_CONFIRM_DELETE_ID" });
  };

  const confirmDelete = () => {
    if (state.confirmDeleteId) {
      handleDeleteTodo(state.confirmDeleteId);
    }
    closeDeleteModal();
  };
  //  ----
  const handleUpdateTodo = (id, newText) => {
    const todoToUpdate = state.todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    if (!newText.trim()) return;
    const updatedData = { text: newText.trim() };

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => dispatch({ type: "UPDATE_TODO", payload: data }))
      .catch((error) =>
        console.error("Erreur lors de la modification de la tâche:", error)
      );
  };

  const handleToggleComplete = (id) => {
    const todoToUpdate = state.todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;
    const updatedStatus = { completed: !todoToUpdate.completed };

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStatus),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "TOGGLE_COMPLETE", payload: data }))
      .catch((error) =>
        console.error("Erreur lors de la mise à jour de la tâche:", error)
      );
  };

  // ----Filter ----
  const setFilterStatus = (status) => {
    dispatch({ type: "SET_FILTER_STATUS", payload: status });
  };

  const filteredTodos = useMemo(() => {
    switch (state.filterStatus) {
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      case "active":
        return state.todos.filter((todo) => !todo.completed);
      case "all":
      default:
        return state.todos;
    }
  }, [state.todos, state.filterStatus]);

  // ----Task editing----
  const startEditing = (id) => {
    dispatch({ type: "SET_EDITING_ID", payload: id });
  };

  const stopEditing = () => {
    dispatch({ type: "CLEAR_EDITING_ID" });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        allTodos: state.todos,
        handleAddTodo,
        handleDeleteTodo,
        handleToggleComplete,
        handleUpdateTodo,
        filterStatus: state.filterStatus,
        setFilterStatus,
        loading: state.loading || !minimumTimeElapsed,
        totalTodoCount: state.totalTodoCount,
        initialLoadComplete: state.initialLoadComplete,
        startEditing,
        stopEditing,
        editingTodoId: state.editingTodoId,
        openDeleteModal,
        closeDeleteModal,
        confirmDelete,
        isDeleteModalOpen: state.confirmDeleteId !== null,
        todoToDeleteId: state.confirmDeleteId,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};

/* The Provider is a special component related to the Context API. 
It allows to provide data, states or functions to a whole part of your application, 
without having to manually prop drilling.*/
