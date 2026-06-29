import { listArray } from "./list.js";

function createNewTodos(title, dueDate, detail) {
    const todosId = crypto.randomUUID();

    return {title, dueDate, detail, todosId};
}

function addNewTodosToArray(obj, formId) {
    for(const list of listArray) {
        if(list.listId === formId) {
            list.todosArray.push(obj);
            break;   
        }else {
            continue;
        }
    }
}

function deleteTodosFromArray(todosId, formId) {
    const getTodosArray = (formId) => {
        for(const list of listArray) {
            if(formId === list.listId) {
                return list.todosArray;
                break;
            }else {
                continue;
            }
        }
    }

    const currentTodosArray = getTodosArray(formId);

    for(const todos of currentTodosArray) {
        if(todosId === todos.todosId) {
            currentTodosArray.splice(currentTodosArray.indexOf(todos), 1);
            break;
        }else {
            continue;
        }
    }

}

function getAllTodosArray() {
    const todosArrayAll = [];
    for(const list of listArray) {
        list.todosArray.forEach(todos => todosArrayAll.push(todos));
    }
    return todosArrayAll;
}

function formatDueDate(dueDate) {
    if(dueDate.slice(5).startsWith('0')) {
        return Number(dueDate.slice(6, 7) + dueDate.slice(8));
    }else {
        return Number(dueDate.slice(5, 7) + dueDate.slice(8));
    }
}

function findWhichTodosLessUrgent(obj, formId) {
    const getTodosArray = (formId) => {
        for(const list of listArray) {
            if(formId === list.listId) {
                return list.todosArray;
                break;
            }else {
                continue;
            }
        }
    }

    const currentTodosArray = getTodosArray(formId);
    const mappedArray = currentTodosArray.filter(todos => todos.todosId !== obj.todosId);

    for(const todos of mappedArray) {
        if(formatDueDate(obj.dueDate) > formatDueDate(todos.dueDate)) {
            continue;
        }else {
            return todos.todosId;
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

export {createNewTodos, addNewTodosToArray, deleteTodosFromArray, setTodayAsMin, getAllTodosArray, findWhichTodosLessUrgent}