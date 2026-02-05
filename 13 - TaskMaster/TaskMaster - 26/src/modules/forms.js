import { addTask } from "../db/db.js";

const formEl = document.getElementById("task-form");
const buttonEl = document.getElementById("add-btn");

/**
 * Initialize the form listener event
 */
export function initializeFormListener() {
    buttonEl.disabled = true;

    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const data = Object.fromEntries(new FormData(formEl).entries());
        console.log(data);
        addTask({
            id: Math.random(), title: data.title, dueDate: data.dueDate
        });
    });

    // Automatic
    formEl.addEventListener("input", (e) => {
       const data= Object.fromEntries(new FormData(formEl).entries());

       if (formEl.checkValidity() && !validateData(data).length) {
           buttonEl.disabled = false;
       } else {
           buttonEl.disabled = true;
       }
    });
}

/**
 * Validate the entire form
 * @param request FormData as a JS object
 * @returns {*[]}
 */
function validateData(request) {
    // Validate that the dueDate is not in the past
    const today = new Date();
    const errors = [];

    if (request.dueDate && request.dueDate < today) {
        errors.push('Due date cannot be in the past');
    }

    if (request.title.length <= 3) {
        errors.push('Title cannot be in the past');
    }

    return errors;
}
