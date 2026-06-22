import { listArray } from "./list.js";

function createNewTodos(title, dueDate, detail) {
    const todosId = crypto.randomUUID();

    return {title, dueDate, detail, todosId};
}

function addNewTodosToArray(title, dueDate, detail) {
    const newTodos = createNewTodos(title, dueDate, detail);
    const form = document.querySelector('.todosform');

    for(const list of listArray) {
        if(list.listId === form.id) {
            list.todosArray.push(newTodos);
            break;   
        }else {
            continue;
        }
    }
}

function setTodayAsMin() {
    const today = new Date();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedToday = `${yyyy}-${mm}-${dd}`;

    return formattedToday;
}

export {addNewTodosToArray}