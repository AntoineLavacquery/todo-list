import {
    compareAsc,
    format,
    startOfDay,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
} from "date-fns";

export default class Storage {
    getProjectObj(project) {
        return localStorage.getItem(project)
            ? JSON.parse(localStorage.getItem(project))
            : [];
    }

    addTodo(newTodo) {
        const projectObj = this.getProjectObj(newTodo.project);

        if (projectObj) {
            const todoExists = projectObj.some(
                (todo) =>
                    todo.title === newTodo.title &&
                    todo.dueDate === newTodo.dueDate
            );

            if (!todoExists) {
                projectObj.push(newTodo);
                localStorage.setItem(
                    newTodo.project,
                    JSON.stringify(projectObj)
                );
            } else {
                alert(
                    `${newTodoCard.title} with ${newTodoCard.dueDate} already exists`
                );
            }
        } else {
            localStorage.setItem(newTodo.project, JSON.stringify([newTodo]));
        }
    }

    addProject(project) {
        localStorage.setItem(project, JSON.stringify([]));
    }

    deleteTodo(todoToDelete) {
        const projectsNames = this.getProjectsNames();
        projectsNames.forEach((projectName) => {
            const projectObj = this.getProjectObj(projectName);
            const todoIndex = projectObj.findIndex((todo) =>
                this.areTodosEqual(todo, todoToDelete)
            );

            if (todoIndex !== -1) {
                projectObj.splice(todoIndex, 1);
                localStorage.setItem(projectName, JSON.stringify(projectObj));
            }
        });
    }

    deleteProject(project) {
        localStorage.removeItem(project);
    }

    display() {
        console.log({ localStorage });
    }

    wipe() {
        localStorage.clear();
    }

    getProjectsNames() {
        const projects = [];
        for (let i = 0; i < localStorage.length; i++) {
            const project = localStorage.key(i);
            projects.push(project);
        }
        return projects;
    }

    getAllTodos() {
        let allProjects = [];
        const projectsNames = this.getProjectsNames();
        projectsNames.forEach((projectName) => {
            const projectObj = this.getProjectObj(projectName);

            for (const project of projectObj) {
                allProjects.push(project);
            }
        });
        return allProjects;
    }

    getTodaysTodos() {
        const allTodos = this.getAllTodos();
        const currentDate = startOfDay(new Date());
        const todaysTodos = allTodos.filter((todo) => {
            return !compareAsc(startOfDay(new Date(todo.dueDate)), currentDate);
        });
        return todaysTodos;
    }

    getThisWeekTodos() {
        const allTodos = this.getAllTodos();
        const currentDate = startOfDay(new Date());
        const daysOfWeek = eachDayOfInterval({
            start: startOfWeek(currentDate),
            end: endOfWeek(currentDate),
        });
        const thisWeekTodos = allTodos.filter((todo) => {
            const todoDate = startOfDay(new Date(todo.dueDate));
            return daysOfWeek.some((day) => +day === +todoDate);
        });
        return thisWeekTodos;
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
