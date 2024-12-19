let tasks = [];

export function addTask(title, dueTime, priority) {
    if (!title || typeof dueTime !== 'number' || typeof priority !== 'number') {
        throw new Error("Invalid task data. Please provide a title, dueTime (in minutes), and priority.");
    }
    const task = {
        title,
        dueTime,
        priority
    };
    tasks.push(task);
    displayTasks();
}

export function sortTasksByPriority() {
    tasks.sort((a, b) => a.priority - b.priority);
}

export function displayTasksDueInNextMinutes(minutes) {
    const currentTime = new Date();
    const dueTimeLimit = currentTime.getTime() + minutes * 60 * 1000;
    
    const dueTasks = tasks.filter(task => {
        const taskDueTime = new Date(currentTime.getTime() + task.dueTime * 60 * 1000);
        return taskDueTime <= dueTimeLimit;
    });

    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = "";
    dueTasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.textContent = `${task.title} (Due in ${task.dueTime} minutes, Priority: ${task.priority})`;
        taskListDiv.appendChild(taskDiv);
    });
}

export function sendReminders() {
    tasks.forEach(task => {
        const reminderTime = task.dueTime * 60 * 1000;
        setTimeout(() => {
            alert(`Reminder: ${task.title} is due now!`);
        }, reminderTime);
    });
}

function displayTasks() {
    const taskListDiv = document.getElementById('taskList');
    taskListDiv.innerHTML = ""; 
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.textContent = `${task.title} (Due in ${task.dueTime} minutes, Priority: ${task.priority})`;
        taskListDiv.appendChild(taskDiv);
    });
}


document.getElementById('addTaskButton').addEventListener('click', () => {
    const title = document.getElementById('taskTitle').value;
    const dueTime = parseInt(document.getElementById('dueTime').value);
    const priority = parseInt(document.getElementById('priority').value);

    try {
        addTask(title, dueTime, priority);
        sendReminders();
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('displayTasksButton').addEventListener('click', () => {
    displayTasksDueInNextMinutes(10);
});

function sortTasksByPriority() {
    tasks.sort((a, b) => a.priority - b.priority);
    displayTasks();
}


document.getElementById('sortByPriorityButton').addEventListener('click', () => {
    sortTasksByPriority(); 
});