import request from "../helpers/request.js";
export function getTasks() {
  return (despatch) => {
    request("http://localhost:3001/task").then((tasks) => {
      despatch({ type: "GET_TASKS", tasks: tasks });
    });
  };
}
export function newTask(newTask) {
  return (despatch) => {
    despatch({ type: "ADDING_TASKS" });
    request("http://localhost:3001/task", "POST", newTask).then((res) => {
      despatch({ type: "NEW_TASKS", res: res });
    });
  };
}
export function deleteSelect(taskIds) {
  return (despatch) => {
    despatch({ type: "DELETE_SELECTED_TASKS_CHECK" });

    request("http://localhost:3001/task", "PATCH", {
      tasks: [...taskIds],
    }).then(() => {
      despatch({ type: "DELETE_SELECTED_TASKS", taskIds });
    });
  };
}
