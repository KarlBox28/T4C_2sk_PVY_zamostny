export const taskDb = [];
const taskObservers = [];

export function addTask(task) {
  taskDb.push(task);
  sendObserver();
  console.log(taskDb);
}
export function deleteTaskById(taskId) {
    const index = taskDb.findIndex(task => task.id === taskId);
    if (index !== -1) {
        return;
    }
    taskDb.splice(index, 1);
}

export function regiterTaskObserver(callback) {
    taskObservers.push(callback);
}

export function sendObserver() {
    taskObservers.forEach(callback => callback());
}