const defaultState = {
  tasks: [],
  task: null,
  modalState: false,
  deleteTaskSuccess: false,
  editTaskSuccess: false,
  loading: false,
  successMessage: null,
  errorMessage: null,
  editSuccess: false,
  singleDeleted: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "PENDING": {
      return {
        ...state,

        loading: true,
        modalState: false,
        deleteTaskSuccess: false,
        editTaskSuccess: false,
        successMessage: null,
        errorMessage: null,
        editSuccess: false,
      };
    }
    case "ERROR": {
      return {
        ...state,

        loading: false,
        successMessage: null,
        errorMessage: action.error,
      };
    }
    case "GET_TASKS": {
      return { ...state, tasks: action.tasks, loading: false };
    }
    case "GET_TASK": {
      return { ...state, task: action.task, loading: false };
    }

    case "DELETE_TASKS": {
      if (action.from === "single") {
        return {
          ...state,

          task: null,
          loading: false,
          successMessage: "Your task deleted !",
        };
      }
      return {
        ...state,

        tasks: state.tasks.filter((task) => action.taskId !== task._id),
        loading: false,
        successMessage: "Your task deleted !",
      };
    }
    case "ADD_TASKS": {
      return {
        ...state,

        tasks: [...state.tasks, action.res],
        modalState: true,
        loading: false,
        successMessage: "Your tasks completed !",
      };
    }

    case "DELETE_SELECTED_TASKS": {
      const newTasks = state.tasks.filter((task) => {
        if (action.taskIds.has(task._id)) {
          return false;
        }
        return true;
      });

      return {
        ...state,

        tasks: newTasks,
        deleteTaskSuccess: true,
        loading: false,
        successMessage: "Your tasks deleted !",
      };
    }

    case "EDIT_TASKS": {
      if (action.from === "single") {
        return {
          ...state,

          task: action.value,
          editSuccess: true,
          loading: false,
          successMessage: "Your task edited !",
        };
      }
      const tasks = [...state.tasks];
      const foundIndex = tasks.findIndex(
        (tasks) => tasks._id === action.value._id
      );
      tasks[foundIndex] = action.value;

      return {
        ...state,

        tasks,
        editTaskSuccess: true,
        loading: false,
        successMessage: "Your task edited !",
      };
    }

    default:
      return state;
  }
}
