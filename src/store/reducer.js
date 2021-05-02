const defaultState = {
  tasks: [],
  modalState: false,
  deleteTaskSuccess: false,
  editTaskSuccess: false,
  loading: false,
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
      };
    }
    case "GET_TASKS": {
      return { ...state, tasks: action.tasks, loading: false };
    }

    case "DELETE_TASKS": {
      return {
        ...state,

        tasks: state.tasks.filter((task) => action.taskId !== task._id),
        loading: false,
      };
    }
    case "ADD_TASKS": {
      return {
        ...state,

        tasks: [...state.tasks, action.res],
        modalState: true,
        loading: false,
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
      };
    }

    case "EDIT_TASKS": {
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
      };
    }

    default:
      return state;
  }
}
