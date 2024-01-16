import { compareAsc, format } from "date-fns";
import Storage from "./modules/storage";
import Projects from "./modules/project";

class TodoCard {
    constructor(title, project, description, dueDate, priority, notes) {
        (this.title = title),
            (this.project = project),
            (this.description = description),
            (this.dueDate = dueDate),
            (this.priority = priority),
            (this.notes = notes);
    }
}

const storage = new Storage();
const projects = new Projects(storage, "Personal", "Work");

storage.wipe();

storage.display();
projects.display();

console.log("~~~~~~~~~~~~~~~~~");

const todoContainer = document.querySelector("div.todos");

function displayTodos(todoList) {
    todoContainer.innerText = "";
    todoList.forEach((todo) => {
        console.log(todo);
        todoContainer.appendChild(createTodoElement(todo));
    });
}

function createTodoElement(todo) {
    const todoElement = document.createElement("div");

    const title = document.createElement("p");
    title.innerText = todo.title;

    const project = document.createElement("p");
    project.innerText = todo.project;

    const desc = document.createElement("p");
    desc.innerText = todo.description;

    const dueDate = document.createElement("p");
    dueDate.innerText = todo.dueDate;

    const notes = document.createElement("p");
    notes.innerText = todo.notes;

    todoElement.appendChild(title);
    todoElement.appendChild(project);
    todoElement.appendChild(desc);
    todoElement.appendChild(dueDate);
    todoElement.appendChild(notes);

    return todoElement;
}

const displayButton = document.querySelector("button#display");

displayButton.addEventListener("click", function () {
    displayTodos(storage.getTodoList());
});

console.log(storage.getTodoList());

const addTodoButton = document.querySelector("button#add");

addTodoButton.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(document.querySelector("form"));

    const title = formData.get("title");
    const project = formData.get("project");
    const description = formData.get("description");
    const dueDate = formData.get("dueDate");
    const notes = formData.get("notes");

    console.log("Title:", title);
    console.log("Project:", project);
    console.log("Description:", description);
    console.log("Due Date:", dueDate);
    console.log("Notes:", notes);

    const newTodo = new TodoCard(
        title,
        project,
        description,
        new Date(dueDate),
        0,
        notes
    );
    storage.addTodo(newTodo);

    displayTodos(storage.getTodoList());
});
