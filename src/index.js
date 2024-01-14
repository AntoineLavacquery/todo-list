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
        this.title = title,
        this.project = project,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.notes = notes
    }
}

const todo1 = new TodoCard("titre", "Work", "description", "date", "priorité", "blabla");
const todo2 = new TodoCard("titre2", "Personal", "description2", "date2", "priorité2", "blabla2");
const todo3 = new TodoCard("titre3", "Work", "description3", "date3", "priorité3", "blabla3");
const todo4 = new TodoCard("titre4", "Personal", "description4", "date4", "priorité4", "blabla4");
const todo5 = new TodoCard("titre5", "Work", "description5", "date5", "priorité5", "blabla5");
const todo6 = new TodoCard("titre6", "Personal", "description6", "date6", "priorité6", "blabla6");

const storage = new Storage;
const projects = new Projects(storage, "Personal", "Work", "House");

storage.wipe();
storage.addTodo(todo1);
storage.addTodo(todo2);
storage.addTodo(todo3);
storage.addTodo(todo4);
storage.addTodo(todo5);
storage.addTodo(todo6);
storage.display();
projects.display();

console.log("~~~~~~~~~~~~~~~~~")
// projects.deleteProject("Personal");

console.log(storage.getTodosFromProject("Personal"))

// console.log("Storage :")
// storage.display();
// console.log("Projects :")
// projects.display();