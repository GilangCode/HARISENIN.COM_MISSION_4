document.addEventListener("DOMContentLoaded", loadTasks );

function loadTasks () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTasktoDOM(task));
}

function addTask(){
    const name = document.getElementById("name").value;
    const job = document.getElementById("job").value;
    const taskDesc = document.getElementById("taskDesc").value;
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;

    const task = {
        id: Date.now(),
        name,
        job,
        taskDesc,
        date,
        category
    };

    addTasktoDOM(task);
    saveTask(task);

    document.getElementById("name").value = "";
    document.getElementById("job").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("date").value = "";
    document.getElementById("category").value = "";
}

function addTasktoDOM(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.dataset.id = task.id;
    taskItem.className = task.completed ? 'completed' : '';

    taskItem.innerHTML = `
        <div class="task-info">
            <strong>${task.name} - ${task.jabatan}</strong><br>
            ${task.date} - ${task.taskDesc} - ${task.category}
        </div>
        <div class="task-actions">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${task.id})">
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    filterTasks('all');
}

//function editTask()

function editTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const task = tasks.find(task => task.id === id);
    document.getElementById('name').value = task.name;
    document.getElementById('job').value = task.job;
    document.getElementById('taskDesc').value = task.taskDesc;
    document.getElementById('date').value = task.date;
    document.getElementById('category').value = task.category;
    deleteTask(id);
}


function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const newTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    filterTasks('all');
}

function deleteAllTasks() {
    localStorage.removeItem('tasks');
    filterTasks('all');
}

function filterTasks(filter) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    let filteredTasks;
    if (filter === 'all') {
        filteredTasks = tasks;
    } else if (filter === 'todo') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'complete') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => addTasktoDOM(task));
}

