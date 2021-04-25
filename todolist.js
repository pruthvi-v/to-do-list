//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //TODO div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item'); //used to add the class name
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Check trash button
    const trashedButton = document.createElement('button');
    trashedButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashedButton.classList.add('trash-btn');
    todoDiv.appendChild(trashedButton);
    //append div element to ul
    todoList.appendChild(todoDiv);
    //Clear TODO INPUT
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if(item.classList[0]=== 'trash-btn') {
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
             todo.remove();
        });
    }
    //Check mark
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
        const todos = todoList.childNodes;
        todos.forEach(function(todo){  
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }  
                break;    
        }
    });
    
}

//Implementing local storage
function saveLocalTodos(todo) {
     //Check, do i already have thing in there?
     let todos;
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.push(todo);
     localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
        newTodo.classList.add('todo-item'); //used to add the class name
        todoDiv.appendChild(newTodo);
        
        //Check Mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Check trash button
        const trashedButton = document.createElement('button');
        trashedButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashedButton.classList.add('trash-btn');
        todoDiv.appendChild(trashedButton);
        //append div element to ul
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}