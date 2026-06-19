const listArray = [];

function createNewList (name) {
    const todosArray = [];
    const listId = crypto.randomUUID();
    return{name, todosArray, listId};
}

function addNewListToArray(name) {
    const newList = createNewList(name);
    listArray.push(newList);
}

function deleteListFromArray(id) {
    for(const list of listArray) {
        if(id === list.listId) {
            listArray.splice(listArray.indexOf(list), 1);
        }else continue;
    }
}


export {listArray, addNewListToArray, deleteListFromArray};