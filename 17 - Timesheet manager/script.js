const taskDetailDiv = document.querySelector('.detail');
const formEl = document.querySelector('.form');

console.log(taskDetailDiv);
console.log(formEl);

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    let newTask = document.createElement("div");
    newTask.classList.add('task');
    let nazev = document.createElement("span");
    nazev.innerHTML = formEl.querySelector('input:first-child').value;
    newTask.appendChild(nazev);
    let cas = document.createElement("span");
    cas.innerHTML = formEl.querySelector('input:nth-child(2)').value;
    newTask.appendChild(cas);
    let timeDisplay = document.createElement("span");
    timeDisplay.id = "timeDisplay";
    newTask.appendChild(timeDisplay);
    taskDetailDiv.appendChild(newTask);
})

function updateDisplay() {
    let taskDisplay = document.getElementById("timeDisplay");
    const totalSeconds = Math.floor(elapsedTime / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timeDisplay.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}