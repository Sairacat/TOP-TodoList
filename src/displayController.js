import {createNewList, addNewListToArray, deleteListFromArray, getLengthOfTodosArray, listArray} from "./list.js";
import {addNewTodosToArray, createNewTodos, deleteTodosFromArray, getAllTodosArray, setTodayAsMin, findWhichTodosLessUrgent, formatDueDate } from "./todos.js";
import {AddNewTodosInLocal, deleteTodosInLocal, addNewListInLocal, deleteListInLocal } from "./localStorage.js";
import { parseISO, differenceInDays } from "date-fns";
import { changePic } from "./changePic.js";

function init() {
    InitializeCollapseEvent();
    IntializeListEvent();
    InitializeTodosEvent();
    intializeSearchBarEvent();
    intializeLocalStorageEvent();
    intializeChangePicEvent();

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
        const newList = createNewList(listName.value);
        addNewListToArray(newList);
        addNewListInLocal(newList);
        displayListNameAndTodosCard(newList);
        listDialog.close();
        form.reset();
    })
}

function InitializeTodosEvent() {
    const form = document.querySelector('.todosform');
    const todosDialog = document.querySelector('#addtodos');
    const cancelTodosDialogBtn = document.querySelector('.cancel-todos-btn');
    const dueDate = document.querySelector('#duedate');
    dueDate.min = setTodayAsMin();

    cancelTodosDialogBtn.addEventListener('click', () => {
        todosDialog.close();
        form.reset();
        form.id = '';
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formId = e.target.dataset.formId;
        const todosNumber = document.querySelector(`[data-num-id = "${formId}"]`);
        const todosTitle = document.querySelector('#todosname');
        const detail = document.querySelector('#detail');
        const newTodos = createNewTodos(todosTitle.value, dueDate.value, detail.value);

        addNewTodosToArray(newTodos, formId);
        AddNewTodosInLocal(newTodos, formId);
        displayTodosUnit(newTodos, formId);
        todosNumber.textContent = getLengthOfTodosArray(formId);

        console.log(listArray);
        todosDialog.close();
        form.reset();
        form.dataset.formId = '';
    })
}

function intializeSearchBarEvent() {
    const searchBar = document.querySelector('#search-bar');
    const selectUnit = document.querySelector('#time-select');

    searchBar.addEventListener('input', () => {
        const currentTodosArray = getAllTodosArray();
        const currentTodosInDom = Array.from(document.querySelectorAll('.todos-unit'));
        const todosIdArrayFiltered = currentTodosArray
        .filter(todos => todos.title.toLowerCase().startsWith(searchBar.value.toLowerCase()))
        .map(todos => todos.todosId);


        currentTodosInDom.forEach(todos => {
            if(!todosIdArrayFiltered.includes(todos.dataset.unitId)) {
                todos.style.display = 'none';
            }else {
                todos.style.display = 'block';
            }
        })
    })

    selectUnit.addEventListener('change', () => {
        const currentTodosArray = getAllTodosArray();
        const currentTodosInDom = Array.from(document.querySelectorAll('.todos-unit'));
        const today = setTodayAsMin();
        
        if(selectUnit.value === 'week') {
            const todosIdArrayFiltered = currentTodosArray
            .filter(todos => differenceInDays(parseISO(todos.dueDate), parseISO(today)) < 8)
            .map(todos => todos.todosId);

            console.log(todosIdArrayFiltered);

            currentTodosInDom.forEach(todos => {
                if(!todosIdArrayFiltered.includes(todos.dataset.unitId)) {
                    todos.style.display = 'none';
                }else {
                    todos.style.display = 'block';
                }
            })
        }else if(selectUnit.value === 'month') {
            const todosIdArrayFiltered = currentTodosArray
            .filter(todos => differenceInDays(parseISO(todos.dueDate), parseISO(today)) < 31)
            .map(todos => todos.todosId);

            currentTodosInDom.forEach(todos => {
                if(!todosIdArrayFiltered.includes(todos.dataset.unitId)) {
                    todos.style.display = 'none';
                }else {
                    todos.style.display = 'block';
                }
            })
        }else {
            currentTodosInDom.forEach(todos => todos.style.display = 'block');
        }

        console.log(differenceInDays(parseISO('2026-07-10'), parseISO(today)));
    })
}

function intializeLocalStorageEvent() {
    if(localStorage.getItem('localArray') === null) {
        localStorage.setItem('localArray', JSON.stringify([]))
    }else {
        const localArray = JSON.parse(localStorage.getItem('localArray'));
        for(const list of localArray) {
            listArray.push(list);
            displayListNameAndTodosCard(list);
            list.todosArray.forEach(todos => displayTodosUnit(todos, list.listId));
        }
    }
}

function intializeChangePicEvent() {
    const changeBtn = document.querySelector('.change-pic');

    changeBtn.addEventListener('click', () => {
        changePic();
    })
}

function displayListNameAndTodosCard(newList) {
    
    const listContainer = document.querySelector('.list-container');
    const todosArea = document.querySelector('.todos-area');
    const todosDialog = document.querySelector('#addtodos')
    const form = document.querySelector('.todosform');

    const listUnit = document.createElement('div');
    listUnit.classList.add('list-unit');
    listUnit.classList.add('unit-fadeIn');

    const listName = document.createElement('div');
    listName.textContent = newList.name;

    const todosNumber = document.createElement('span');
    todosNumber.classList.add('todos-number');
    todosNumber.dataset.numId = newList.listId;
    todosNumber.textContent = newList.todosArray.length;

    const todosCard = document.createElement('div');
    todosCard.dataset.cardId = newList.listId;
    todosCard.classList.add('todos-card');
    todosCard.classList.add('unit-fadeIn');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');

    const cardName = document.createElement('h2');
    cardName.textContent = newList.name;

    const addTodosBtn = document.createElement('div');
    addTodosBtn.textContent = '+';
    addTodosBtn.classList.add('addtodosbtn');
    addTodosBtn.addEventListener('click', () => {
        todosDialog.showModal();
        form.reset();
        form.dataset.formId = newList.listId;
    })
 
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-list-btn');
    deleteBtn.addEventListener('click', () => {
        deleteListFromArray(newList.listId);
        deleteListInLocal(newList.listId);
        listUnit.remove();
        todosCard.remove();
    })

    listUnit.append(listName, todosNumber, deleteBtn);
    listContainer.append(listUnit);
    cardTitle.append(cardName, addTodosBtn);
    todosCard.append(cardTitle);
    todosArea.append(todosCard);
}


function displayTodosUnit(obj, formId) {
    const todosCard = document.querySelector(`[data-card-id = "${formId}"]`);
    const todosNumber = document.querySelector(`[data-num-id = "${formId}"]`);

    const todosUnit = document.createElement('div');
    todosUnit.dataset.unitId = obj.todosId;
    todosUnit.classList.add('todos-unit');
    todosUnit.classList.add('unit-fadeIn');

    const todosTitle = document.createElement('div');
    todosTitle.textContent = obj.title.slice(0, 1).toUpperCase() + obj.title.slice(1);

    const todosDueDate = document.createElement('div');
    todosDueDate.textContent = obj.dueDate.slice(5);

    const todosBtn = document.createElement('input');
    todosBtn.type = 'checkbox';
    todosBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodosFromArray(obj.todosId, formId);
        deleteTodosInLocal(obj, formId);
        setTimeout(() => {
            todosUnit.classList.add('unit-fade-out');
            todosUnit.addEventListener('animationend', () => {
                todosUnit.remove();
            }, {once: true})
            todosNumber.textContent = getLengthOfTodosArray(formId);
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

    const idOfLessUrgentTodos = findWhichTodosLessUrgent(obj, formId);
    const lessUrgentTodos = document.querySelector(`[data-unit-id = "${idOfLessUrgentTodos}"]`);

    if(!lessUrgentTodos) {
        todosCard.append(todosUnit);
    }else {
        lessUrgentTodos.before(todosUnit);
    }


    


}


export {init};