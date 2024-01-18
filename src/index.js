import { compareAsc, format } from "date-fns";
import Storage from "./modules/storage";

class Todo {
    constructor(title, project, dueDate, priority) {
        (this.title = title),
            (this.project = project),
            (this.dueDate = dueDate),
            (this.priority = priority);
    }
}

const todoContainer = document.querySelector("div#main");

function appendTodoToDOM(todo) {
    console.log("Coucou");
    const todoElement = document.createElement("div");
    todoElement.classList =
        "alert alert-secondary alert-dismissible fade show d-flex justify-content-between";

    const leftPart = document.createElement("div");
    leftPart.classList = "d-flex gap-2";

    const checkbox = document.createElement("input");
    checkbox.id = "checkbox";
    checkbox.classList = "form-check-input";
    checkbox.type = "checkbox";

    const title = document.createElement("span");
    title.id = title;
    title.innerText = todo.title;

    leftPart.appendChild(checkbox);
    leftPart.appendChild(title);

    const timeRemaining = document.createElement("div");
    timeRemaining.id = "remaining";
    timeRemaining.innerHTML = todo.dueDate;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");

    todoElement.appendChild(leftPart);
    todoElement.appendChild(timeRemaining);
    todoElement.appendChild(closeButton);

    todoContainer.appendChild(todoElement);
}

const storage = new Storage();

const todo1 = new Todo("titre1", "Personal", "2024-01-18", 2);
const todo2 = new Todo("titre2", "Personal", "2024-01-20", 1);
const todo3 = new Todo("titre3", "Work", "2024-03-26", 0);
const todo4 = new Todo("titre4", "Sport", "2024-03-27", 2);

storage.wipe();
storage.addTodo(todo1);
storage.addTodo(todo2);
storage.addTodo(todo3);
storage.addTodo(todo4);

console.log("~~~~~~~~~~~~~~~~~");
console.log(storage.getProjectsNames());

console.log(storage.getProjectObj("Personal"));
console.log(storage.getAllTodos());

function desactivateAllButtons() {
    const homeButtons = document.querySelectorAll("ul#home button");
    const projectButtons = document.querySelectorAll("ul#project button");
    const buttons = [...homeButtons, ...projectButtons];
    buttons.forEach((button) => button.classList.remove("active"));
}

function createButton(label, containerQuery, callback) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("nav-link", "link-body-emphasis", "btn", "btn-link");
    button.textContent = label;
    button.addEventListener("click", function () {
        desactivateAllButtons();
        button.classList.add("active");
        callback(label);
    });
    const li = document.createElement("li");
    li.appendChild(button);
    document.querySelector(containerQuery).appendChild(li);
    // button.callback = callback;
}

function displayInbox() {
    const todos = storage.getAllTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function displayToday() {
    const todos = storage.getTodaysTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function displayThisWeek() {
    const todos = storage.getThisWeekTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function displayProject(project) {
    const todos = storage.getProjectObj(project);
    if (!todos) {
        storage.addProject(project);
    }
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        appendTodoToDOM(todo);
    });
}

function loadProjects() {
    const projectsNames = storage.getProjectsNames();
    projectsNames.forEach((projectName) => {
        createButton(projectName, "ul#project", displayProject);
    });
}

createButton("Inbox", "ul#home", displayInbox);
createButton("Today", "ul#home", displayToday);
createButton("This Week", "ul#home", displayThisWeek);

loadProjects();
