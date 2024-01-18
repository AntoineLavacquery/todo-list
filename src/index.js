import { compareAsc, format } from "date-fns";
import Storage from "./modules/storage";

class Todo {
    constructor(title, project, dueDate, priority) {
        (this.title = title),
            (this.project = project),
            (this.dueDate = dueDate),
            (this.priority = priority)
    }
}

const todoContainer = document.querySelector("div#main");

// function displayTodo(todo) {
//     todoContainer.innerText = "";
//     todoList.forEach((todo) => {
//         console.log(todo);
//         todoContainer.appendChild(createTodoElement(todo));
//     });
// }

function appendTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList = "alert alert-secondary alert-dismissible fade show d-flex justify-content-between"

    const leftPart = document.createElement("div");
    leftPart.classList = "d-flex gap-2"

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
    timeRemaining.id = remaining;
    timeRemaining.innerHTML = todo.dueDate;

    todoElement.appendChild(title);
    todoElement.appendChild(leftPart);
    todoElement.appendChild(timeRemaining);

    todoContainer.appendChild(todoElement);
}

// const displayButton = document.querySelector("button#display");

// displayButton.addEventListener("click", function () {
//     displayTodos(storage.getTodoList());
// });

// console.log(storage.getTodoList());

// const addTodoButton = document.querySelector("button#add");

// addTodoButton.addEventListener("click", (event) => {
//     event.preventDefault();

//     const formData = new FormData(document.querySelector("form"));

//     const title = formData.get("title");
//     const project = formData.get("project");
//     const description = formData.get("description");
//     const dueDate = formData.get("dueDate");
//     const notes = formData.get("notes");

//     console.log("Title:", title);
//     console.log("Project:", project);
//     console.log("Description:", description);
//     console.log("Due Date:", dueDate);
//     console.log("Notes:", notes);

//     const newTodo = new Todo(
//         title,
//         project,
//         description,
//         new Date(dueDate),
//         0,
//         notes
//     );
//     storage.addTodo(newTodo);

//     displayTodos(storage.getTodoList());
// });

// ----------------------------------------------


function createButton(label, containerQuery, callback) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("nav-link", "link-body-emphasis", "btn", "btn-link");
    button.textContent = label;
    button.addEventListener("click", function () {
        activateAndExecute(button, containerQuery, callback);
    });
    const li = document.createElement("li");
    li.appendChild(button);
    document.querySelector(containerQuery).appendChild(li);
    button.callback = callback;
}

// Fonction pour activer le bouton et désactiver les autres
function activateAndExecute(clickedButton, containerQuery, callback) {
    // Desactivate all buttons
    var buttons = document.querySelectorAll(`ul#home button, ul#project button`);
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });

    clickedButton.classList.add("active");
    callback();
}




// createButton("Personnal", "ul#project", storage.getTodaysTodos);

function simulateAddTodo() {
    // add todo to storage
    // add toto to dom
}

const storage = new Storage();

createButton("Inbox", "ul#home", storage.getTodoList);
createButton("Today", "ul#home", storage.getTodoList);
createButton("This Week", "ul#home", storage.getTodoList);

// const projects = new Projects(storage, "Personal", "Work");

// function displayProject(project) {
//     project.projects.forEach((project) => {
//         createButton(project)
//         if project
//     })
//     createButton(project.)
// }

const todo1 = new Todo("titre1", "Personal", "2024-01-24", 2);
const todo2 = new Todo("titre2", "Personal", "2024-01-25", 1);
const todo3 = new Todo("titre3", "Work", "2024-01-26", 0);
const todo4 = new Todo("titre4", "Sport", "2024-01-27", 2);

storage.wipe();
storage.addTodo(todo1);
storage.addTodo(todo2);
storage.addTodo(todo3);
storage.addTodo(todo4);

console.log("~~~~~~~~~~~~~~~~~");
console.log(storage.getProjectsNames());

console.log(storage.getProjectObj("Personal"));
console.log(storage.getAllTodos());

