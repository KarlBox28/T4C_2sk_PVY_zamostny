const taskDetailDiv = document.querySelector('.detail');
const formEl = document.querySelector('.form');
let startOfActualTask;
let actualTaskData;
console.log(taskDetailDiv);
console.log(formEl);

window.addEventListener("DOMContentLoaded", () => {
    loadHistoryFromLocalStorage();
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    startOfActualTask = getDateTimeFromInput(formEl.querySelector('input:nth-child(2)'));
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
    
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "End";
    deleteButton.addEventListener('click', () => {
        taskDetailDiv.removeChild(newTask);
        let newTr = document.createElement('tr');
        let nameTd = document.createElement('td');
        nameTd.innerHTML = actualTaskData.name;
        newTr.appendChild(nameTd);
        
        let startTimeTd = document.createElement('td');
        startTimeTd.innerHTML = new Date(actualTaskData.startTime).toLocaleTimeString();
        newTr.appendChild(startTimeTd);
        
        let endTimeTd = document.createElement('td');
        endTimeTd.innerHTML = new Date().toLocaleTimeString();
        newTr.appendChild(endTimeTd);
        
        let durationTd = document.createElement('td');
        durationTd.innerHTML = formatTime(Date.now() - startOfActualTask);
        newTr.appendChild(durationTd);
        
        console.log(newTr);
        console.log(document.querySelector('table tbody'));
        document.querySelector('table tbody').appendChild(newTr);
        saveHistoryToLocalStorage();
    });
    actualTaskData = {
        name: formEl.querySelector('input:first-child').value,
        startTime: getDateTimeFromInput(formEl.querySelector('input:nth-child(2)'))
    }
    newTask.appendChild(deleteButton);
    taskDetailDiv.appendChild(newTask);

    startOfActualTask = getDateTimeFromInput(formEl.querySelector('input:nth-child(2)'));
})

setInterval(UpdateDisplay, 1000);

function UpdateDisplay() {
    const timeDisplay = document.getElementById("timeDisplay");
    if(timeDisplay != null) {
        timeDisplay.innerHTML = formatTime(Date.now() - startOfActualTask);
    }
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0")
    );
}

function getDateTimeFromInput(input) {
    let [hours, minutes] = input.value.split(":").map(Number);

    let today = new Date();

    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
        0,
        0
    ).getTime();
}

function loadHistoryFromLocalStorage() {
    const tbody = document.querySelector("table.history tbody");
    const dataStr = localStorage.getItem("taskHistory");

    if (!dataStr) return; // nic není uloženo

    const data = JSON.parse(dataStr);

    data.forEach(task => {
        const tr = document.createElement("tr");

        const continueTd = document.createElement("td");
        const continueBtn = document.createElement("button");
        continueBtn.textContent = task.continueButton;
        continueTd.appendChild(continueBtn);
        tr.appendChild(continueTd);

        const nameTd = document.createElement("td");
        nameTd.textContent = task.name;
        tr.appendChild(nameTd);

        const startTd = document.createElement("td");
        startTd.textContent = task.startTime;
        tr.appendChild(startTd);

        const endTd = document.createElement("td");
        endTd.textContent = task.endTime;
        tr.appendChild(endTd);

        const durationTd = document.createElement("td");
        durationTd.textContent = task.duration;
        tr.appendChild(durationTd);

        tbody.appendChild(tr);
    });
}

function saveHistoryToLocalStorage() {
    const rows = document.querySelectorAll("table.history tbody tr");
    const data = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        data.push({
            continueButton: cells[0].querySelector("button").textContent || "",
            name: cells[1].textContent,
            startTime: cells[2].textContent,
            endTime: cells[3].textContent,
            duration: cells[4].textContent
        });
    });

    localStorage.setItem("taskHistory", JSON.stringify(data));
}
