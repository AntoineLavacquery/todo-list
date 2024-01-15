import { compareAsc, format, startOfDay, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { compareDates } from './date';

export default class Storage {
    getTodoList() {
        return JSON.parse(localStorage.getItem("todos")) || [];
    }

    getTodosFromProject(project) {
        const todoList = this.getTodoList();
        return todoList.filter(todo => todo.project == project);
    }

    getTodaysTodos() {
        const todoList = this.getTodoList();
        const currentDate = startOfDay(new Date());
        const todaysTodos = todoList.filter(todo => !compareAsc(startOfDay(new Date(todo.dueDate)), currentDate));
        return todaysTodos;
    }

    getThisWeekTodos() {
        const todoList = this.getTodoList();
        const currentDate = startOfDay(new Date());
        const daysOfWeek = eachDayOfInterval({ start: startOfWeek(currentDate), end: endOfWeek(currentDate) });
        console.log({daysOfWeek})
        const thisWeekTodos = todoList.filter(todo => {
            const todoDate = startOfDay(new Date(todo.dueDate));
            return daysOfWeek.some(day => +day === +todoDate);
        });
        return thisWeekTodos;
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