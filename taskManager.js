
const tasks = [];
function addTask(title, dueTime, priority) {
    try {
        if (!title || !dueTime || !priority) {
            throw new Error("Missing task fields");
        }
        const task = { title, dueTime, priority };
        tasks.push(task);
        console.log(`Task added: ${title}`);
    } catch (error) {
        console.error(error.message);
    }
}


function sortTasksByPriority() {
    return tasks.sort((a, b) => a.priority - b.priority);
}


function displayTasksDueInNextMinutes(minutes) {
    const currentTime = new Date();
    const dueTimeLimit = new Date(currentTime.getTime() + minutes * 60000);
    const dueTasks = tasks.filter(task => {
        const taskDueTime = new Date(currentTime.getTime() + task.dueTime * 60000);
        return taskDueTime <= dueTimeLimit;
    });
    return dueTasks;
}


function sendReminders() {
    tasks.forEach(task => {
        setTimeout(() => {
            console.log(`Reminder: ${task.title} is due!`);
        }, task.dueTime * 60000);
    });
}

// Exporting functions
export { addTask, sortTasksByPriority, displayTasksDueInNextMinutes, sendReminders };