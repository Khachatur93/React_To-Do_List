const defaultState = { tasks: [] };

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "GET_TASKS": {
      return { ...state, tasks: action.tasks };
    }

    default:
      return {
        tasks: [],
      };
  }
}
