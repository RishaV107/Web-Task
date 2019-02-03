//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event listener 
loadEventListener();


// Load all event Listener
function loadEventListener(){

    //DOM load events
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task event
    form.addEventListener('submit',addTask);  
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //clear Task event
    clearBtn.addEventListener('click',clearTasks);
    //filter task
    filter.addEventListener('keyup',filterTasks);
}

//Get task from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    //Create li elements
    const li = document.createElement('li');
    //Add class
      li.className = 'collection-item';
    //Create text node and append to li
      li.appendChild(document.createTextNode(task));
    //Create new link elements
    const link = document.createElement('a');
    //Add class
      link.className = 'delete-item secondary-content';
    //Add icon HTML
      link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
      li.appendChild(link); 
    //Append li to ul
      taskList.appendChild(li);    
    })

}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    //Create li elements
    const li = document.createElement('li');
    //Add class
      li.className = 'collection-item';
    //Create text node and append to li
      li.appendChild(document.createTextNode(taskInput.value));
    //Create new link elements
    const link = document.createElement('a');
    //Add class
      link.className = 'delete-item secondary-content';
    //Add icon HTML
      link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append link to li
      li.appendChild(link); 
    //Append li to ul
      taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';   
    
    e.preventDefault();
}

//Function to store in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove function 

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        //Remove from ls
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

//Remove from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Clear task
function clearTasks(){
    taskList.innerHTML = '';
    //Clear Task from LS
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}
//filter task also used for searched
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text)==-1){
                task.style.display = 'block';                
            }
            else {
                task.style.display = 'none';
            }
        }
    )
}
