export default class Storage {
    getTodoList() {
        return JSON.parse(localStorage.getItem("todos")) || [];
    }

    getTodosFromProject(project) {
        const todoList = this.getTodoList();
        return todoList.filter(todo => todo.project == project);
    }

    getTodayTodos() {
        // todo
    }

    getThisWeekTodos() {
        // todo
    }

    display() {
        const todoList = this.getTodoList();
        console.log(todoList);
    }

    addTodo(newTodoCard) {
        const todoList = this.getTodoList();

        const todoExists = todoList.some(
            (todo) =>
                todo.title === newTodoCard.title &&
                todo.dueDate === newTodoCard.dueDate
        );

        if (!todoExists) {
            todoList.push(newTodoCard);
            localStorage.setItem("todos", JSON.stringify(todoList));
        } else {
            alert(
                `${newTodoCard.title} with ${newTodoCard.dueDate} already exists`
            );
        }
    }

    wipe() {
        localStorage.setItem("todos", JSON.stringify([]));
    }

    deleteTodo(todoToRemove) {
        const todoList = this.getTodoList();
        const todoIndex = todoList.findIndex((todo) =>
            this.areTodosEqual(todo, todoToRemove)
        );

        if (todoIndex !== -1) {
            todoList.splice(todoIndex, 1);
            localStorage.setItem("todos", JSON.stringify(todoList));
        }
    }

    deleteProjectTodos(project) {
        let todoList = this.getTodoList();
        todoList = todoList.filter(todo => todo.project != project);
        localStorage.setItem("todos", JSON.stringify(todoList));
    }

    areTodosEqual(todo1, todo2) {
        return (
            todo1.title === todo2.title &&
            todo1.description === todo2.description &&
            todo1.dueDate === todo2.dueDate &&
            todo1.priority === todo2.priority &&
            todo1.notes === todo2.notes
        );
    }
}