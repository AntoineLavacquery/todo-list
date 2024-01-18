import { compareAsc, format } from "date-fns";
import Storage from "./modules/storage";
import * as elements from './modules/elements.js';

class Todo {
    constructor(title, project, dueDate, priority) {
        (this.title = title),
            (this.project = project),
            (this.dueDate = dueDate),
            (this.priority = priority);
    }
}

const todoContainer = document.querySelector("div#main");

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

function displayInbox() {
    const todos = storage.getAllTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(elements.createTodoElement(todo));
    });
}

function displayToday() {
    const todos = storage.getTodaysTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(elements.createTodoElement(todo));
    });
}

function displayThisWeek() {
    const todos = storage.getThisWeekTodos();
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(elements.createTodoElement(todo));
    });
}

function displayProject(project) {
    const todos = storage.getProjectObj(project);
    if (!todos) {
        storage.addProject(project);
    }
    todoContainer.innerHTML = "";
    todos.forEach((todo) => {
        todoContainer.appendChild(elements.createTodoElement(todo));
    });
}

function loadProjects() {
    const projectsNames = storage.getProjectsNames();
    projectsNames.forEach((projectName) => {
        elements.createButton(projectName, "ul#project", displayProject);
    });
}

elements.createButton("Inbox", "ul#home", displayInbox);
elements.createButton("Today", "ul#home", displayToday);
elements.createButton("This Week", "ul#home", displayThisWeek);

loadProjects();
