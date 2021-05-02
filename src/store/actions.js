import request from "../helpers/request.js";
import * as types from "./types";
export function getTasks() {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request("http://localhost:3001/task").then((tasks) => {
      despatch({ type: types.GET_TASKS, tasks: tasks });
    });
  };
}
export function newTask(newTask) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request("http://localhost:3001/task", "POST", newTask).then((res) => {
      despatch({ type: types.ADD_TASKS, res: res });
    });
  };
}
export function deleteSelect(taskIds) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request("http://localhost:3001/task", "PATCH", {
      tasks: [...taskIds],
    }).then(() => {
      despatch({ type: types.DELETE_SELECTED_TASKS, taskIds });
    });
  };
}
export function deleteTasks(taskId) {
  return (despatch) => {
    request(`http://localhost:3001/task/${taskId}`, "DELETE").then(() => {
      despatch({ type: types.DELETE_TASKS, taskId: taskId });
    });
  };
}
export function handleSaveTask(editedTask) {
  return (despatch) => {
    despatch({ type: types.PENDING });

    request(
      `http://localhost:3001/task/${editedTask._id}`,
      "PUT",
      editedTask
    ).then((value) => {
      despatch({ type: types.EDIT_TASKS, value: value });
    });
  };
}
