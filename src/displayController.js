function init() {
    collapse();
    displayListDialog();
}

function collapse() {
    const collapseBtn = document.querySelector('.collapse-btn');
    const contentWrapper = document.querySelector('.content-wrapper');
    collapseBtn.addEventListener('click', () => {
        contentWrapper.classList.toggle('collapse');
    })
}

function displayListDialog() {
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

export {init};