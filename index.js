let menu_items = document.querySelectorAll(".menu-item");
let main = document.querySelector(".home-page");
let today = document.getElementById("today");
let main_html = main.innerHTML;

menu_items.forEach((menu_item) => {
  menu_item.addEventListener("click", (e) => {
    e.preventDefault();
    let selected_item = document.querySelector(".selected");
    if (selected_item != undefined) selected_item.classList.remove("selected");
    menu_item.classList.add("selected");
  });
});

today.addEventListener("click", function (event) {
  main.innerHTML = "";
  main.className = "today_main";
  let nav = createNav();
  main.append(nav);
  let sub_title = document.createElement("h2");
  sub_title.className = "today_sub-title";
  sub_title.innerText = "Tasks";
  main.append(sub_title);
  let tasks = document.createElement("div");
  tasks.className = "today_tasks";
  let ul = document.createElement("ul");
  // add Todo
  let add_todo = createAddTodoButton();
  ul.append(add_todo);
  tasks.append(ul);
  main.append(tasks);
});

function createTask(add_todo) {
  let id = localStorage.key("todays_tasks")
    ? Object.values(JSON.parse(localStorage.getItem("todays_tasks"))[0]).length
    : 0;
  let task = document.createElement("li");
  task.className = "today_task not-done";
  task.id = "task" + id;
  let task_icon = document.createElement("div");
  task_icon.className = "task-icon";
  let circle = document.createElement("i");
  circle.className = "fa-regular fa-circle";
  task_icon.append(circle);
  task_icon.addEventListener("click", toggleTasksDone);
  task.append(task_icon);
  let task_text = document.createElement("div");
  task_text.className = "task-text";
  let input = document.createElement("input");
  input.type = "text";
  input.addEventListener("change", (e) => addTodoToLocalStorage(e, task));
  task_text.append(input);
  task.append(task_text);
  add_todo.before(task);
}

function toggleTasksDone(e) {
  let todays_tasks = JSON.parse(localStorage.getItem("todays_tasks"));
  if (e.currentTarget.parentElement.className.includes("not-done")) {
    e.currentTarget.firstElementChild.className = "fa-solid fa-circle-check";
    e.currentTarget.parentElement.classList.remove("not-done");
    e.currentTarget.parentElement.classList.add("done");
  } else {
    e.currentTarget.firstElementChild.className = "fa-regular fa-circle";
    e.currentTarget.parentElement.classList.add("not-done");
    e.currentTarget.parentElement.classList.remove("done");
  }
  todays_tasks[0][e.currentTarget.parentElement.id].done =
    !todays_tasks[0][e.currentTarget.parentElement.id].done;
  localStorage.setItem("todays_tasks", JSON.stringify(todays_tasks));
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

function createAddTodoButton() {
  let add_todo = document.createElement("li");
  add_todo.className = "today_task add-todo";
  let add_todo_icon = document.createElement("div");
  add_todo_icon.className = "task-icon";
  let add_todo_plus = document.createElement("i");
  add_todo_plus.className = "fa-solid fa-circle-plus";
  add_todo_icon.append(add_todo_plus);
  add_todo.append(add_todo_icon);
  let add_todo_text = document.createElement("div");
  add_todo_text.className = "task-text";
  add_todo_text.innerText = "Add to-do";
  add_todo.appendChild(add_todo_text);
  add_todo.addEventListener("click", (event) =>
    createTask(event.currentTarget)
  );
  return add_todo;
}

function createNav() {
  let nav = document.createElement("nav");
  nav.className = "today_nav";
  let go_back = document.createElement("a");
  go_back.className = "today_nav-go_back";
  let go_back_logo = document.createElement("i");
  go_back_logo.className = "fa-solid fa-chevron-left";
  go_back.append(go_back_logo);
  nav.append(go_back);
  let nav_title = document.createElement("h1");
  nav_title.className = "today_nav_title";
  let today_date = getTodaysDate();
  nav_title.innerHTML = today_date;
  nav.append(nav_title);
  return nav;
}
