import { taskDb, registerObserver } from '../db/db.js';
const taskListEl = document.getElementById('task-list');
export function renderTasks() {
    taskListEl.innerHTML = '';
    const fragment = document.createDocumentFragment();

    taskDb.forEach((task) => {
        const taskEl = document.createElement('li');
        taskEl.innerHTML = `
            <li class="task-item" data-id="${task.id}">
                <label class="task-body">
                    <input type="checkbox" class="task-complete-checkbox" />
                    <span class="task-title">${task.title}</span>
                </label>
                <button class="delete-btn">Delete</button>
            </li>
        `;
        fragment.appendChild(taskEl);
        });
}