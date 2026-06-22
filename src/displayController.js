import {addNewListToArray, deleteListFromArray, listArray} from "./list.js";
import {addNewTodosToArray } from "./todos.js";

function init() {
    InitializeCollapseEvent();
    IntializeListEvent();
    InitializeTodosEvent();

}

function InitializeCollapseEvent() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const contentWrapper = document.querySelector('.content-wrapper');
    collapseBtn.addEventListener('click', () => {
        contentWrapper.classList.toggle('collapse');
    })
}

function IntializeListEvent() {
    const form = document.querySelector('#listform');
    const listDialog = document.querySelector('#addlist');
    const listName = document.querySelector('#listname');
    const addListBtn = document.querySelector('.addlistbtn');
    const cancelListBtn = document.querySelector('.cancel-list-btn');

    addListBtn.addEventListener('click', () => {
        listDialog.showModal();
        form.reset();
    })

    cancelListBtn.addEventListener('click', () => {
        listDialog.close();
        form.reset();
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewListToArray(listName.value)
        displayListName();
        displayTodosCard();
        listDialog.close();
        form.reset();
    })
}

function InitializeTodosEvent() {
    const form = document.querySelector('.todosform');
    const todosDialog = document.querySelector('#addtodos');
    const cancelTodosDialogBtn = document.querySelector('.cancel-todos-btn');

    cancelTodosDialogBtn.addEventListener('click', () => {
        todosDialog.close();
        form.reset();
        form.id = '';
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formId = e.target.id;
        const todosTitle = document.querySelector('#todosname');
        const dueDate = document.querySelector('#duedate');
        const detail = document.querySelector('#detail');

        addNewTodosToArray(todosTitle.value, dueDate.value, detail.value);
        console.log(listArray);
        todosDialog.close();
        form.reset();
        form.id = '';
    })
}

function displayListName() {
    const listContainer = document.querySelector('.list-container');
    listContainer.replaceChildren();

    for(const list of listArray) {
        const listUnit = document.createElement('div');
        listUnit.classList.add('list-unit');
        listUnit.classList.add('unit-fadeIn');

        const listName = document.createElement('div');
        listName.textContent = list.name;

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-list-btn');
        deleteBtn.id = list.listId;
        deleteBtn.addEventListener('click', () => {
            deleteListFromArray(deleteBtn.id);
            displayListName();
            displayTodosCard();
        })

        listUnit.append(listName, deleteBtn);
        listContainer.append(listUnit);
    }
}

function displayTodosCard() {
    const todosArea = document.querySelector('.todos-area');
    const todosDialog = document.querySelector('#addtodos')
    const form = document.querySelector('.todosform');
    todosArea.replaceChildren();

    for(const list of listArray) {
        const todosCard = document.createElement('div');
        todosCard.classList.add('todos-card');
        todosCard.classList.add('unit-fadeIn');

        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');

        const listName = document.createElement('h2');
        listName.textContent = list.name;

        const addTodosBtn = document.createElement('div');
        addTodosBtn.textContent = '+';
        addTodosBtn.classList.add('addtodosbtn');
        addTodosBtn.id = list.listId;
        addTodosBtn.addEventListener('click', () => {
            todosDialog.showModal();
            form.reset();
            form.id = addTodosBtn.id;
        })

        cardTitle.append(listName, addTodosBtn);
        todosCard.append(cardTitle);
        todosArea.append(todosCard);
    }
}



export {init};