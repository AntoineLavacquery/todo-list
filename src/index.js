import { compareAsc, format } from "date-fns";
import Storage from "./modules/storage";
import Projects from "./modules/project";

const date = format(new Date(2014, 1, 11), "yyyy-MM-dd");

const body = document.querySelector("body");
const hello = document.createElement("p");
hello.innerText = `${date}`;
body.appendChild(hello);

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

const todo0 = new TodoCard(
    "titre0",
    "Work0",
    "description0",
    new Date("2024-01-15"),
    0,
    "blabla0"
);
const todo1 = new TodoCard(
    "titre1",
    "Work1",
    "description1",
    new Date("2024-01-22"),
    0,
    "blabla1"
);
const todo2 = new TodoCard(
    "titre2",
    "Personal",
    "description2",
    new Date("2024-02-02"),
    1,
    "blabla2"
);
const todo3 = new TodoCard(
    "titre3",
    "Work",
    "description3",
    new Date("2024-01-23"),
    1,
    "blabla3"
);
const todo4 = new TodoCard(
    "titre4",
    "Personal",
    "description4",
    new Date("2024-02-03"),
    1,
    "blabla4"
);
const todo5 = new TodoCard(
    "titre5",
    "Work",
    "description5",
    new Date("2024-01-24"),
    2,
    "blabla5"
);
const todo6 = new TodoCard(
    "titre6",
    "Personal",
    "description6",
    new Date("2024-02-04"),
    2,
    "blabla6"
);

const storage = new Storage();
const projects = new Projects(storage, "Personal", "Work", "House");

storage.wipe();
storage.addTodo(todo0);
storage.addTodo(todo1);
storage.addTodo(todo2);
storage.addTodo(todo3);
storage.addTodo(todo4);
storage.addTodo(todo5);
storage.addTodo(todo6);

storage.display();
projects.display();

console.log("~~~~~~~~~~~~~~~~~");

// console.log(storage.getTodaysTodos());

console.log(storage.getThisWeekTodos());

// console.log("Storage :")
// storage.display();
// console.log("Projects :")
// projects.display();
