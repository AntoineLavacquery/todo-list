import { compareAsc, format } from "date-fns";
import Storage from "./modules/storage";

const date = format(new Date(2014, 1, 11), "yyyy-MM-dd");

const body = document.querySelector("body");
const hello = document.createElement("p");
hello.innerText = `${date}`;
body.appendChild(hello);

class TodoCard {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.notes = notes
    }
}

const todo1 = new TodoCard("titre", "description", "date", "priorité", "blabla");
const todo2 = new TodoCard("titre2", "description2", "date2", "priorité2", "blabla2");
const todo3 = new TodoCard("titre3", "description3", "date3", "priorité3", "blabla3");

const storage = new Storage;
storage.add(todo1);
storage.add(todo2);
storage.add(todo3);
storage.display();