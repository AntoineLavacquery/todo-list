import { formatRelative, compareAsc, isPast, formatDistanceToNow, subHours } from "date-fns";
import Storage from "./modules/storage";

class Todo {
    constructor(title, project, dueDate, priority) {
        (this.title = title), (this.project = project), (this.dueDate = dueDate), (this.priority = priority), (this.done = false);
    }
}

const storage = new Storage();
// storage.wipe();

const closeButtonMap = new Map();

function populateBaseTodos() {
    const todayAt8 = new Date();
    todayAt8.setHours(8, 0, 0, 0);

    const todayAt20 = new Date();
    todayAt20.setHours(20, 0, 0, 0);

    const fiveDaysAwayAt16 = new Date();
    fiveDaysAwayAt16.setDate(-5);
    fiveDaysAwayAt16.setHours(16, 0, 0, 0);

    const inOneMonth = new Date();
    inOneMonth.setMonth(inOneMonth.getMonth() + 1);
    inOneMonth.setHours(9, 0, 0, 0);

    const passedTodo = new Todo("Make an appointment with the dentist", "Personal", fiveDaysAwayAt16, 1);
    const todaysMorningTodo = new Todo("Fill the car", "Personal", todayAt8, 1);
    const todaysEveningTodo = new Todo("Yoga", "Sport", todayAt20, 0);
    const futureTodo = new Todo("Compare tickets to London", "Holidays", inOneMonth, 2);

    storage.addTodo(passedTodo);
    storage.addTodo(todaysMorningTodo);
    storage.addTodo(todaysEveningTodo);
    storage.addTodo(futureTodo);
}

populateBaseTodos();

const todoContainer = document.querySelector("div#todo-container");
const openAddTodoButton = document.querySelector("button#open-add-todo");

function displayInbox() {
    const todos = storage.getAllTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(createTodoElement(todo));
    });
}

function displayToday() {
    const todos = storage.getTodaysTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(createTodoElement(todo));
    });
}

function displayThisWeek() {
    const todos = storage.getThisWeekTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(createTodoElement(todo));
    });
}

function displayProject(project) {
    const todos = storage.getProjectObj(project);
    if (!todos) {
        storage.addProject(project);
    }
    todoContainer.innerHTML = "";

    todos.sort((a, b) => {
        return compareAsc(new Date(a.dueDate), new Date(b.dueDate));
    });

    todos.forEach((todo) => {
        todoContainer.appendChild(createTodoElement(todo));
    });
}

function loadProjects() {
    const projectsNames = storage.getProjectsNames();
    projectsNames.forEach((projectName) => {
        createButton(projectName, "ul#project", displayProject);
    });
}

function createButton(label, containerQuery, displayFunction) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("nav-link", "link-body-emphasis", "btn", "btn-link");
    button.textContent = label;
    button.addEventListener("click", function () {
        desactivateAllButtons();
        button.classList.add("active");
        if (containerQuery === "ul#project") {
            openAddTodoButton.classList.remove("disabled");
            displayFunction(label);
        } else {
            openAddTodoButton.classList.add("disabled");
            displayFunction(label);
        }
    });
    const li = document.createElement("li");
    li.appendChild(button);
    document.querySelector(containerQuery).appendChild(li);
}

function isTodoRed(todo) {
    return isPast(new Date(todo.dueDate)) ? "alert-danger" : "alert-secondary";
}

function createTodoElement(todo) {
    console.log({ todo });
    const todoElement = document.createElement("div");
    todoElement.classList = `alert ${isTodoRed(todo)} alert-dismissible fade show d-flex justify-content-between`;

    const leftPart = document.createElement("div");
    leftPart.classList = "d-flex gap-2";

    const checkbox = document.createElement("input");
    checkbox.id = "checkbox";
    checkbox.classList = "form-check-input";
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        todo.done = checkbox.checked;
        storage.updateStatusToLocal(todo);
        if (todo.done) {
            todoElement.classList.add("text-decoration-line-through");
            todoElement.classList.remove(isTodoRed(todo));
            todoElement.classList.add("alert-success");
        } else {
            todoElement.classList.remove("text-decoration-line-through");
            todoElement.classList.remove("alert-success");
            todoElement.classList.add(isTodoRed(todo));
        }
    });

    if (todo.done) {
        todoElement.classList.add("text-decoration-line-through");
        todoElement.classList.remove(isTodoRed(todo));
        todoElement.classList.add("alert-success");
        checkbox.checked = true;
    }

    const title = document.createElement("span");
    title.id = title;
    title.innerText = todo.title;

    leftPart.appendChild(checkbox);
    leftPart.appendChild(title);

    const timeRemainingEl = document.createElement("div");
    timeRemainingEl.id = "remaining";
    timeRemainingEl.innerHTML = formatRelative(new Date(todo.dueDate), new Date());

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");

    closeButtonMap.set(closeButton, todo);

    closeButton.addEventListener('click', () => {
        storage.deleteTodo(closeButtonMap.get(closeButton));
        closeButtonMap.delete(closeButton);
    });

    todoElement.appendChild(leftPart);
    todoElement.appendChild(timeRemainingEl);
    todoElement.appendChild(closeButton);

    return todoElement;
}

function desactivateAllButtons() {
    const homeButtons = document.querySelectorAll("ul#home button");
    const projectButtons = document.querySelectorAll("ul#project button");
    const buttons = [...homeButtons, ...projectButtons];
    buttons.forEach((button) => button.classList.remove("active"));
}

const addTaskButton = document.querySelector("button#add-task");
addTaskButton.addEventListener("click", () => {
    const form = document.querySelector("#add-form");
    const data = new FormData(form);

    const title = data.get("titleinput");
    const date = data.get("dateinput");
    const priority = data.get("btnradio");

    const projectButton = document.querySelector("#project button.active");
    storage.addTodo(new Todo(title, projectButton.textContent, date, priority));
    displayProject(projectButton.textContent);

    const addTodoModal = bootstrap.Modal.getInstance(document.querySelector("#add-todo-modal"));
    addTodoModal.hide();
});

createButton("Inbox", "ul#home", displayInbox);
createButton("Today", "ul#home", displayToday);
createButton("This Week", "ul#home", displayThisWeek);

document.addEventListener("DOMContentLoaded", function () {
    const inboxButton = document.querySelector("ul#home :first-child button");
    inboxButton.click();
});

loadProjects();

// TODO
// prévoir un classement des todos en fonction de la date

// mettre en place le menu d'ajout de project quand on clique sur New
