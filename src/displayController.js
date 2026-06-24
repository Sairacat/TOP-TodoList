import {addNewListToArray, deleteListFromArray, listArray} from "./list.js";
import {addNewTodosToArray, createNewTodos, deleteTodosFromArray } from "./todos.js";

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
        const formId = e.target.dataset.formId;
        const todosTitle = document.querySelector('#todosname');
        const dueDate = document.querySelector('#duedate');
        const detail = document.querySelector('#detail');
        const newTodos = createNewTodos(todosTitle.value, dueDate.value, detail.value);

        addNewTodosToArray(newTodos, formId);
        displayTodosUnit(newTodos, formId);

        console.log(listArray);
        todosDialog.close();
        form.reset();
        form.dataset.formId = '';
    })
}

function displayListName() {
    const listContainer = document.querySelector('.list-container');
    const currentListId = listArray.map(list => list.listId);
    const currentListUnit = Array.from(listContainer.children);
    currentListUnit.forEach(unit => {
        if(!currentListId.includes(unit.dataset.unitId)) {
            unit.remove();
        }
    })

    for(const list of listArray) {
        const isInDom = document.querySelector(`[data-unit-id = "${list.listId}"]`);
        if(isInDom) {
            continue;
        }

        const listUnit = document.createElement('div');
        listUnit.dataset.unitId = list.listId;
        listUnit.classList.add('list-unit');
        listUnit.classList.add('unit-fadeIn');

        const listName = document.createElement('div');
        listName.textContent = list.name;

        const deleteBtn = document.createElement('span');
        deleteBtn.classList.add('delete-list-btn');
        deleteBtn.addEventListener('click', () => {
            deleteListFromArray(list.listId);
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

    const currentListId = listArray.map(list => list.listId);
    const currentTodosCards = Array.from(todosArea.children);
    currentTodosCards.forEach(card => {
        if(!currentListId.includes(card.dataset.cardId)) {
            card.remove();
        }
    })

    for(const list of listArray) {
        const isInDom = document.querySelector(`[data-card-id = "${list.listId}"]`);
        if(isInDom) {
            continue;
        }

        const todosCard = document.createElement('div');
        todosCard.dataset.cardId = list.listId;
        todosCard.classList.add('todos-card');
        todosCard.classList.add('unit-fadeIn');

        const cardTitle = document.createElement('div');
        cardTitle.classList.add('card-title');

        const listName = document.createElement('h2');
        listName.textContent = list.name;

        const addTodosBtn = document.createElement('div');
        addTodosBtn.textContent = '+';
        addTodosBtn.classList.add('addtodosbtn');
        addTodosBtn.dataset.addBtnId = list.listId;
        addTodosBtn.addEventListener('click', () => {
            todosDialog.showModal();
            form.reset();
            form.dataset.formId = addTodosBtn.dataset.addBtnId;
        })

        cardTitle.append(listName, addTodosBtn);
        todosCard.append(cardTitle);
        todosArea.append(todosCard);
    }
}

function displayTodosUnit(obj, formId) {
    const todosCard = document.querySelector(`[data-card-id = "${formId}"]`);

    const todosUnit = document.createElement('div');
    todosUnit.classList.add('todos-unit');
    todosUnit.classList.add('unit-fadeIn');

    const todosTitle = document.createElement('div');
    todosTitle.textContent = obj.title.slice(0, 1).toUpperCase() + obj.title.slice(1);

    const todosDueDate = document.createElement('div');
    todosDueDate.textContent = obj.dueDate;

    const todosBtn = document.createElement('input');
    todosBtn.type = 'checkbox';
    todosBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodosFromArray(obj.todosId, formId);
        setTimeout(() => {
            todosUnit.classList.add('unit-fade-out');
            todosUnit.addEventListener('animationend', () => {
                todosUnit.remove();
            }, {once: true})
        }, 1000)
    })

    const upperUnitPart = document.createElement('div');
    upperUnitPart.classList.add('upper-unit-part');
    upperUnitPart.append(todosTitle, todosDueDate, todosBtn);
    upperUnitPart.addEventListener('click', () => {
        todosUnit.classList.toggle('todos-unit-unfold');
    })


    const todosDetail = document.createElement('div');
    todosDetail.classList.add('todos-detail');
    todosDetail.textContent = obj.detail;

    todosUnit.append(upperUnitPart, todosDetail);
    todosCard.append(todosUnit);
}


export {init};