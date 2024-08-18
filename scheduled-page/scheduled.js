let add_todo_btn = document.querySelector(".task.add-todo");

add_todo_btn.addEventListener("click", createTask);

document.addEventListener("DOMContentLoaded", function () {
  loadAllTasksFromLocalStorage();
});

function loadAllTasksFromLocalStorage() {
  let scheduled_tasks = localStorage.getItem("scheduled_tasks");
  if (scheduled_tasks) {
    scheduled_tasks = JSON.parse(scheduled_tasks)[0];
  } else {
    return;
  }
  for (let value in scheduled_tasks) {
    createTask(
      null,
      scheduled_tasks[value].value,
      scheduled_tasks[value].date,
      scheduled_tasks[value].done,
      value
    );
  }
}

function createTask(e, value, date, done, task_id) {
  let add_todo = e?.currentTarget || add_todo_btn;
  let id = createIdForTask();
  let task = document.createElement("li");
  task.className = done ? "scheduled_task done" : "scheduled_task not-done";
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
  let deadline = document.createElement("div");
  deadline.className = "deadline";
  deadline.innerText = date || "";
  task_text.append(deadline);
  task.append(task_text);
  let task_date = document.createElement("div");
  task_date.className = "task-date";
  let date_selector = document.createElement("input");
  date_selector.type = "datetime-local";
  date_selector.disabled = done || false;
  date_selector.addEventListener("focusout", showDateOfScheduledTask);
  date_selector.addEventListener("focusout", addTodoToLocalStorage);

  task_date.append(date_selector);
  task.append(task_date);
  add_todo.before(task);
}

function showDateOfScheduledTask(e) {
  let date_selector = e.target;
  date_selector.parentElement.previousElementSibling.firstElementChild.nextElementSibling.innerText =
    date_selector.value.split("T").join(", ");
}

function addTodoToLocalStorage(e) {
  let scheduled_tasks = localStorage.getItem("scheduled_tasks");
  let date_selector = e.target;
  let task_id = e.target.parentElement.parentElement.id;
  if (!scheduled_tasks) {
    scheduled_tasks = [
      {
        [task_id]: {
          value:
            date_selector.parentElement.previousElementSibling.firstElementChild
              .value,
          date: date_selector.value,
          done: false,
        },
      },
    ];
    console.log(scheduled_tasks);
  } else {
    scheduled_tasks = JSON.parse(scheduled_tasks);
    scheduled_tasks[0][task_id] = {
      value:
        date_selector.parentElement.previousElementSibling.firstElementChild
          .value,
      date: date_selector.parentElement.previousElementSibling.firstElementChild
        .nextElementSibling.innerText,
      done: false,
    };
  }
  localStorage.setItem("scheduled_tasks", JSON.stringify(scheduled_tasks));
}

function createIdForTask() {
  let scheduled_tasks = localStorage.getItem("scheduled_tasks");
  let id = 0;
  if (scheduled_tasks) {
    let keys = Object.keys(JSON.parse(scheduled_tasks)[0]);
    let last_key = keys[keys.length - 1];
    id = +last_key[last_key.length - 1] + 1;
  }
  return id;
}

function toggleTasksDone(e) {
  let scheduled_tasks = JSON.parse(localStorage.getItem("scheduled_tasks"));
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
  scheduled_tasks[0][task.id].done = !scheduled_tasks[0][task.id].done;
  localStorage.setItem("scheduled_tasks", JSON.stringify(scheduled_tasks));
}

function removeTodo(e) {
  if (e.target.value == "" && e.code == "Backspace") {
    e.target.parentElement.parentElement.remove();
    removeTodoFromLocalStorage(e);
  }
}

function removeTodoFromLocalStorage(e) {
  let scheduled_tasks = JSON.parse(localStorage.getItem("scheduled_tasks"));
  let task_id = e.target.parentElement.parentElement.id;
  delete scheduled_tasks[0][task_id];
  localStorage.setItem("scheduled_tasks", JSON.stringify(scheduled_tasks));
}
