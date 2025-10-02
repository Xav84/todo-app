// Reducer that manages all actions related to the todo state
export const TodoReducer = (state, action) => {
  switch (action.type) {
    /* ---- INITIALIZATION ---- */
    case "SET_TODOS":
      // Replaces the entire todo list (e.g., after fetching from API)
      // Also disables loading and updates the total count
      return {
        ...state,
        todos: action.payload,
        loading: false,
        totalTodoCount: action.payload.length,
        initialLoadComplete: true,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        totalTodoCount: state.totalTodoCount + 1,
      };

    /* ---- UPDATE ---- */
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "SET_EDITING_ID":
      return { ...state, editingTodoId: action.payload };
    case "CLEAR_EDITING_ID":
      return { ...state, editingTodoId: null };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo
        ),
      };

    /* ---- DELETE ---- */
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
        totalTodoCount: state.totalTodoCount - 1,
      };
    case "SET_CONFIRM_DELETE_ID":
      return {
        ...state,
        confirmDeleteId: action.payload,
      };
    case "CLEAR_CONFIRM_DELETE_ID":
      return {
        ...state,
        confirmDeleteId: null,
      };

    /* ---- OTHER ---- */
    case "SET_FILTER_STATUS":
      return { ...state, filterStatus: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_TOTAL_TODO_COUNT":
      return { ...state, totalTodoCount: action.payload };

    default:
      return state;
  }
};

/* ---- INITIAL STATE ---- */
export const initialTodoState = {
  todos: [],
  filterStatus: "all",
  loading: false,
  confirmDeleteId: null,
  totalTodoCount: 0,
  initialLoadComplete: false,
  editingTodoId: null,
};

/* A Reducer is a pure function that describes how the state of the application 
should change in response to an action. Reducers are often used with the 
useReducer hook, which is an alternative to useState for handling more complex states.*/
