
import { addTask, sortTasksByPriority, displayTasksDueInNextMinutes, sendReminders } from './taskManager.js';


function handleAddTask() {
    const title = document.getElementById('taskTitle').value;
    const dueTime = parseInt(document.getElementById('dueTime').value);
    const priority = parseInt(document.getElementById('priority').value);

    if (title && dueTime && priority) {
        addTask(title, dueTime, priority);
        displayTasks();
        document.getElementById('taskTitle').value = '';
        document.getElementById('dueTime').value = '';
        document.getElementById('priority').value = '1'; 
    } else {
        alert("Please fill in all fields.");
    }
}
document.getElementById('sortPriorityButton').addEventListener('click', function() {

    sortTasksByPriority();
});

function sortTasksByPriority() {
  
    tasks.sort((a, b) => a.priority - b.priority);
    displayTasks(); 
}


function displayTasks() {
    const sortedTasks = sortTasksByPriority();
    const dueTasks = displayTasksDueInNextMinutes(10);
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 


    const sortedTasksSection = document.createElement('div');
    sortedTasksSection.classList.add('output-section');
    sortedTasksSection.innerHTML = `
        <h2>Sorted Tasks by Priority:</h2>
        <ul class="task-list">
            ${sortedTasks.map(task => `
                <li class="task-item">
                    <span class="task-title">${task.title}</span>
                    <span class="task-due-time">Due in ${task.dueTime} minutes (Priority: ${task.priority})</span>
                </li>
            `).join('')}
        </ul>
    `;
    outputDiv.appendChild(sortedTasksSection);


    const dueTasksSection = document.createElement('div');
    dueTasksSection.classList.add('output-section');
    dueTasksSection.innerHTML = `
        <h2>Tasks Due in the Next 10 Minutes:</h2>
        <ul class="task-list">
            ${dueTasks.length > 0 ? dueTasks.map(task => `
                <li class="task-item">
                    <span class="task-title">${task.title}</span>
                    <span class="task-due-time">Due in ${task.dueTime} minutes (Priority: ${task.priority})</span>
                </li>
            `).join('') : '<li>No tasks due in the next 10 minutes.</li>'}
        </ul>
    `;
    outputDiv.appendChild(dueTasksSection);
}


document.getElementById('addTaskButton').addEventListener('click', handleAddTask);


sendReminders();