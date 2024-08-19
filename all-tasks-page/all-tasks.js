let all_tasks = document.querySelector(".all-tasks_tasks");

document.addEventListener("DOMContentLoaded", () => {
  loadAllTasksFromLocalStorage();
});

function loadAllTasksFromLocalStorage() {
  let scheduled_tasks = JSON.parse(localStorage.getItem("scheduled_tasks"))[0];
  let todays_tasks = JSON.parse(localStorage.getItem("todays_tasks"))[0];
  if (todays_tasks) {
    for (let value in todays_tasks) {
      createTask(
        null,
        todays_tasks[value].value,
        null,
        todays_tasks[value].done,
        ""
      );
    }
  }

  if (scheduled_tasks) {
    for (let value in scheduled_tasks) {
      createTask(
        null,
        scheduled_tasks[value].value,
        scheduled_tasks[value].date,
        scheduled_tasks[value].done,
        "scheduled_"
      );
    }
  }
}

function createTask(e, value, date, done, className) {
  let task = document.createElement("li");
  task.className = done ? `${className}task done` : `${className}task not-done`;

  let task_icon = document.createElement("div");
  task_icon.className = "task-icon";
  let circle = document.createElement("i");
  circle.className = done ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
  task_icon.append(circle);
  task.append(task_icon);
  let task_text = document.createElement("div");
  task_text.className = "task-text";
  let input = document.createElement("input");
  input.type = "text";
  input.value = value || "";
  input.disabled = true;
  input.addEventListener("change", (e) => addTodoToLocalStorage(e));
  input.addEventListener("keydown", (e) => removeTodo(e));
  task_text.append(input);
  if (date) {
    let deadline = document.createElement("div");
    deadline.className = "deadline";
    deadline.innerText = date || "";
    task_text.append(deadline);
  }

  task.append(task_text);
  let task_date = document.createElement("div");

  all_tasks.firstElementChild.append(task);
}
