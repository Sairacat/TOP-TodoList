import { createNewList } from "./list.js";
import { createNewTodos } from "./todos.js";

const initList = createNewList('Personal');
const initTodos = createNewTodos('shopping', '2026-06-28', 'Buy a bag of rice in walmart');
initList.todosArray.push(initTodos);


function AddNewTodosInLocal(newTodos, formId) {
    const relatedList = JSON.parse(localStorage.getItem(formId));
    relatedList.todosArray.push(newTodos);
    console.log(relatedList.todosArray);
    localStorage.setItem(relatedList.listId, JSON.stringify(relatedList));
    
}

function deleteTodosInLocal(newTodos, formId) {
    const relatedList = JSON.parse(localStorage.getItem(formId));
    relatedList.todosArray.splice(relatedList.todosArray.indexOf(newTodos), 1);
    localStorage.setItem(relatedList.listId, JSON.stringify(relatedList));
}



export {initList, AddNewTodosInLocal, deleteTodosInLocal};
