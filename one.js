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
    //Add task event
    form.addEventListener('submit',addTask);  
    //Remove task event
    taskList.addEventListener('click',removeTask);
    //clear Task event
    clearBtn.addEventListener('click',clearTasks);
    //filter task
    filter.addEventListener('keyup',filterTasks);
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

    //Clear input
    taskInput.value = '';   
    
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
    }
}
//Clear task
function clearTasks(){
    taskList.innerHTML = '';
}

//filter task
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