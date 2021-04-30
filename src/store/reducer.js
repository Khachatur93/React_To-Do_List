const defaultState = { tasks: [], modalState: false, deleteTaskSuccess: false };

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_TASKS": {
      return { ...state, tasks: action.tasks };
    }

    case "DELETE_TASKS": {
      return {
        ...state,

        tasks: state.tasks.filter((task) => action.taskId !== task._id),
      };
    }
    case "NEW_TASKS": {
      return {
        ...state,

        tasks: [...state.tasks, action.res],
        modalState: true,
      };
    }
    case "ADDING_TASKS": {
      return {
        ...state,

        modalState: false,
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
      };
    }
    case "DELETE_SELECTED_TASKS_CHECK": {
      return {
        ...state,

        deleteTaskSuccess: false,
      };
    }
    default:
      return state;
  }
}
