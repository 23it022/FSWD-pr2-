// script.js
import { tasks, addTask, sortTasksByPriority, getTasksDueWithin, handleReminders } from './taskManager.js';

// DOM elements
const addTaskForm = document.getElementById('add-task-form');
const taskTitleInput = document.getElementById('task-title');
const taskDueTimeInput = document.getElementById('task-due-time');
const taskPriorityInput = document.getElementById('task-priority');
const tasksOutput = document.getElementById('tasks-output');

// Display tasks
function displayTasks() {
  tasksOutput.innerHTML = ''; // Clear existing tasks
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    taskElement.innerHTML = `
      <h3>${task.title} (Priority: ${task.priority})</h3>
      <p>Due in: ${task.dueTime} minutes</p>
    `;
    tasksOutput.appendChild(taskElement);
  });
}

// Add task from form
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = taskTitleInput.value;
  const dueTime = parseInt(taskDueTimeInput.value);
  const priority = parseInt(taskPriorityInput.value);

  // Add the task using the addTask function from the module
  addTask(title, dueTime, priority);
  displayTasks(); // Refresh task list
  addTaskForm.reset(); // Reset form
});

// Simulate sending reminders based on task's dueTime
document.getElementById('remind-btn').addEventListener('click', () => {
  handleReminders(); // Start sending reminders
});

// Sort tasks by priority
document.getElementById('sort-btn').addEventListener('click', () => {
  sortTasksByPriority(); // Call the sort function
  displayTasks(); // Refresh task list after sorting
});

// Initially display all tasks
displayTasks();