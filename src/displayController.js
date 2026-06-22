import {addNewListToArray, deleteListFromArray, listArray} from "./list.js";

function init() {
    InitializeCollapseEvent();
    InitializeDialogEvent();
    IntializeListEvent();

}

function InitializeCollapseEvent() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const contentWrapper = document.querySelector('.content-wrapper');
    collapseBtn.addEventListener('click', () => {
        contentWrapper.classList.toggle('collapse');
    })
}

function InitializeDialogEvent() {
    const listDialog = document.querySelector('#addlist');
    const addListBtn = document.querySelector('.addlistbtn');
    const cancelListBtn = document.querySelector('.cancel-list-btn');
    const form = document.querySelector('#listform');

    addListBtn.addEventListener('click', () => {
        listDialog.showModal();
        form.reset();
    })

    cancelListBtn.addEventListener('click', () => {
        listDialog.close();
        form.reset();
    })

}

function IntializeListEvent() {
    const form = document.querySelector('#listform');
    const listDialog = document.querySelector('#addlist');
    const listName = document.querySelector('#listname');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewListToArray(listName.value)
        displayListName();
        displayTodosCard();
        listDialog.close();
        form.reset();
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

        cardTitle.append(listName, addTodosBtn);
        todosCard.append(cardTitle);
        todosArea.append(todosCard);
    }
}



export {init};