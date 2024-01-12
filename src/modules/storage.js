export default class Storage {
    getTodoList() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    display() {
        const todoList = this.getTodoList();
        console.log(todoList);
    }

    add(TodoCard) {
        const todoList = this.getTodoList();
        todoList.push(TodoCard);
        localStorage.setItem('todos', JSON.stringify(todoList));
    }

    add(newTodoCard) {
        const todoList = this.getTodoList();

        const todoExists = todoList.some(
            (todo) =>
                todo.title === newTodoCard.title && todo.dueDate === newTodoCard.dueDate
        );

        if (!todoExists) {
            this.books.push(newTodoCard);
            localStorage.setItem('todos', JSON.stringify(todoList));
        } else {
            alert(`${newTodoCard.title} with ${newTodoCard.dueDate} is already present`);
        }
    }
}

// ----------Factory

// function createStorage() {
//     return {
//       display: function() {
//         console.log("coucou");
//         console.log(localStorage);
//       },
  
//       add: function(todoCard) {
//         localStorage.setItem('todoCard', JSON.stringify(todoCard));
//       }
//     };
//   }
  
//   export default createStorage;
  