const listArray = [];

function createNewList (name) {
    const todosArray = [];
    const listId = crypto.randomUUID();
    return{name, todosArray, listId};
}

function addNewListToArray(newList) {
    listArray.push(newList);
}

function deleteListFromArray(id) {
    for(const list of listArray) {
        if(id === list.listId) {
            listArray.splice(listArray.indexOf(list), 1);
        }else continue;
    }
}

function getLengthOfTodosArray(id) {
    for(const list of listArray) {
        if(id === list.listId) {
            return list.todosArray.length
        }
    }
}


export {listArray, addNewListToArray, deleteListFromArray, createNewList, getLengthOfTodosArray};