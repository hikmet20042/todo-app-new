let add_todo_btn = document.querySelector(".task.add-todo");

add_todo_btn.addEventListener("click", createTask);

document.addEventListener("DOMContentLoaded", function () {
  changeTheDate();
  loadAllTasksFromLocalStorage();
});

function loadAllTasksFromLocalStorage() {
  let all_tasks = localStorage.getItem("todays_tasks");
  if (all_tasks) {
    all_tasks = JSON.parse(all_tasks)[0];
  } else {
    return;
  }
  for (let value in all_tasks) {
    createTask(null, all_tasks[value].value, all_tasks[value].done, value);
  }
}

function createTask(e, value, done, task_id) {
  let add_todo = e?.currentTarget || add_todo_btn;
  let id = createIdForTask();
  let task = document.createElement("li");
  task.className = done ? "task done" : "task not-done";
  task.id = task_id || "task" + id;
  let task_icon = document.createElement("div");
  task_icon.className = "task-icon";
  let circle = document.createElement("i");
  circle.className = done ? "fa-solid fa-circle-check" : "fa-regular fa-circle";
  task_icon.append(circle);
  task_icon.addEventListener("click", toggleTasksDone);
  task.append(task_icon);
  let task_text = document.createElement("div");
  task_text.className = "task-text";
  let input = document.createElement("input");
  input.type = "text";
  input.value = value || "";
  input.disabled = done || false;
  input.addEventListener("change", (e) => addTodoToLocalStorage(e));
  input.addEventListener("keydown", (e) => removeTodo(e));
  task_text.append(input);
  task.append(task_text);
  add_todo.before(task);
}

function createIdForTask() {
  let todays_tasks = localStorage.getItem("todays_tasks");
  let id = 0;
  if (todays_tasks) {
    let keys = Object.keys(JSON.parse(todays_tasks)[0]);
    let last_key = keys[keys.length - 1];
    id = +last_key[last_key.length - 1] + 1;
  }
  return id;
}

function removeTodo(e) {
  if (e.target.value == "" && e.code == "Backspace") {
    e.target.parentElement.parentElement.remove();
    removeTodoFromLocalStorage(e);
  }
}

function removeTodoFromLocalStorage(e) {
  let all_tasks = JSON.parse(localStorage.getItem("todays_tasks"));
  let task_id = e.target.parentElement.parentElement.id;
  delete all_tasks[0][task_id];
  localStorage.setItem("todays_tasks", JSON.stringify(all_tasks));
}

function addTodoToLocalStorage(e) {
  let all_tasks = localStorage.getItem("todays_tasks");
  let task_id = e.target.parentElement.parentElement.id;
  if (!all_tasks) {
    all_tasks = [
      {
        [task_id]: {
          value: e.target.value,
          done: false,
        },
      },
    ];
  } else {
    all_tasks = JSON.parse(all_tasks);
    all_tasks[0][task_id] = {
      value: e.target.value,
      done: false,
    };
  }
  localStorage.setItem("todays_tasks", JSON.stringify(all_tasks));
}

function toggleTasksDone(e) {
  let todays_tasks = JSON.parse(localStorage.getItem("todays_tasks"));
  let task = e.currentTarget.parentElement;
  let task_icon = e.currentTarget.firstElementChild;
  let task_input = e.target.parentElement.nextElementSibling.firstElementChild;
  if (task.className.includes("not-done")) {
    task_icon.className = "fa-solid fa-circle-check";
    task.classList.remove("not-done");
    task.classList.add("done");
  } else {
    task_icon.className = "fa-regular fa-circle";
    task.classList.add("not-done");
    task.classList.remove("done");
  }
  task_input.disabled = !task_input.disabled;
  todays_tasks[0][task.id].done = !todays_tasks[0][task.id].done;
  localStorage.setItem("todays_tasks", JSON.stringify(todays_tasks));
}

function changeTheDate() {
  let nav_title = document.querySelector(".today_nav_title");
  let todays_date = getTodaysDate();
  nav_title.innerHTML = todays_date;
}

function getTodaysDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let todays_date =
    new Date().getDate() +
    " " +
    months[new Date().getMonth()] +
    " " +
    new Date().getFullYear();
  return todays_date;
}
