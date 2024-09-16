// Select DOM elements
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('new-task');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

// Task data structure
let tasks = [];

// Function to create a task object
function createTask(text) {
    return {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };
}

// Function to render the tasks
function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.innerText = `${task.text} (Added on: ${task.createdAt})`;
        
        // Create action buttons
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.onclick = () => editTask(task.id);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => deleteTask(task.id);

        taskElement.append(editButton, deleteButton);

        if (task.completed) {
            taskElement.classList.add('complete');
            const completeDate = document.createElement('span');
            completeDate.innerText = ` (Completed on: ${task.completedAt})`;
            taskElement.appendChild(completeDate);
            completedTasksList.appendChild(taskElement);
        } else {
            const completeButton = document.createElement('button');
            completeButton.innerText = 'Complete';
            completeButton.classList.add('complete-btn');
            completeButton.onclick = () => markTaskComplete(task.id);
            taskElement.appendChild(completeButton);
            pendingTasksList.appendChild(taskElement);
        }
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = createTask(taskText);
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
}

// Function to mark a task as complete
function markTaskComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = true;
    task.completedAt = new Date().toLocaleString();
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

// Add task on button click
addTaskButton.addEventListener('click', addTask);

// Add task on Enter key press
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
