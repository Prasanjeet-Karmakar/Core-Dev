const inputBox = document.querySelector('.input-field')
const addBtn = document.querySelector('.add-todo-button')
const todoList = document.querySelector('.todoLists')
const deleteAllBtn = document.querySelector('.delete-button')

inputBox.onkeyup = () => {
    let userValue = inputBox.value
    if (userValue.trim() != 0) {
        addBtn.classList.add('active')
    }
    else {
        addBtn.classList.remove('active')
    }
}

showTasks()

addBtn.onclick = () => {
    let userValue = inputBox.value
    let getLocalStorageData = localStorage.getItem('New Todo')
    if (getLocalStorageData == null) {
        listArray = [];
    }
    else {
        listArray = JSON.parse(getLocalStorageData);
    }
    listArray.push(userValue)
    localStorage.setItem('New Todo', JSON.stringify(listArray));
    showTasks();
    addBtn.classList.remove('active')
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem('New Todo')
    if (getLocalStorageData == null) {
        listArray = []
    }
    else {
        listArray = JSON.parse(getLocalStorageData)
    }

    const pendingTaskNumb = document.querySelector('.pendingTasks')
    pendingTaskNumb.textContent = listArray.length
    if (listArray.length > 0) {
        deleteAllBtn.classList.add('active')
    }
    else {
        deleteAllBtn.classList.remove('active')
    }

    let newLiTag = ""
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    })

    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem('New Todo')
    listArray = JSON.parse(getLocalStorageData)
    listArray.splice(index, 1)
    localStorage.setItem('New Todo', JSON.stringify(listArray))
    showTasks()
}

deleteAllBtn.onclick = () => {
    listArray = []
    localStorage.setItem('New Todo', JSON.stringify(listArray));
    showTasks();
}