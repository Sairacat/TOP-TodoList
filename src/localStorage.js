import { createNewList } from "./list.js";
import { createNewTodos } from "./todos.js";

function addNewListInLocal(newList) {
    const localArray = JSON.parse(localStorage.getItem('localArray'));
    localArray.push(newList);
    localStorage.setItem('localArray', JSON.stringify(localArray));
}

function deleteListInLocal(id) {
    const localArray = JSON.parse(localStorage.getItem('localArray'));
    for(const list of localArray) {
        if(list.listId === id) {
            localArray.splice(localArray.indexOf(list), 1);
            break;
        }
    }
    localStorage.setItem('localArray', JSON.stringify(localArray));
}


function AddNewTodosInLocal(newTodos, formId) {
    const localArray = JSON.parse(localStorage.getItem('localArray'));
    for(const list of localArray) {
        if(list.listId === formId) {
            list.todosArray.push(newTodos)
            break;
        }
    }
    localStorage.setItem('localArray', JSON.stringify(localArray));
    
}

function deleteTodosInLocal(newTodos, formId) {
    const localArray = JSON.parse(localStorage.getItem('localArray'));
    for(const list of localArray) {
        if(list.listId === formId) {
            list.todosArray.splice(list.todosArray.indexOf(newTodos), 1);
            break;
        }
    }
    localStorage.setItem('localArray', JSON.stringify(localArray));
}



export { AddNewTodosInLocal, deleteTodosInLocal, addNewListInLocal, deleteListInLocal};
