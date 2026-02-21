let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function render() {
    const currentDiv = document.getElementById("currentTask");
    const historyTable = document.getElementById("historyTable");
    historyTable.innerHTML = "";

    const activeTask = tasks.find(t => !t.end);
    const finishedTasks = tasks.filter(t => t.end);

    let total = 0;

    // Aktivní úkol
    if (activeTask) {
        const startDate = new Date(activeTask.start);
        const duration = Date.now() - startDate;
        total += duration;

        currentDiv.innerHTML = `
            <h3>${activeTask.name}</h3>
            <p>Začátek: ${startDate.toLocaleString()}</p>
            <p><strong>${formatTime(duration)}</strong></p>
            <button class="btn-danger" id="endBtn">Ukončit</button>
        `;

        document.getElementById("endBtn")
            .addEventListener("click", () => endTask(activeTask.id));
    } else {
        currentDiv.innerHTML = "Žádný aktivní úkol";
    }

    // Historie
    finishedTasks
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .forEach(task => {
            const startDate = new Date(task.start);
            const endDate = new Date(task.end);
            const duration = endDate - startDate;
            total += duration;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${task.name}</td>
                <td>${startDate.toLocaleString()}</td>
                <td>${endDate.toLocaleString()}</td>
                <td>${formatTime(duration)}</td>
                <td>
                    <button class="btn-danger delete-btn">Smazat</button>
                </td>
            `;

            tr.querySelector(".delete-btn")
                .addEventListener("click", () => deleteTask(task.id));

            historyTable.appendChild(tr);
        });

    document.getElementById("totalTime").textContent = formatTime(total);
}

function startTask(name, startValue) {

    if (tasks.some(t => !t.end)) {
        alert("Nejprve ukončete aktuální úkol.");
        return;
    }

    let startTime = startValue ? new Date(startValue) : new Date();

    // kontrola překrývání s jakýmkoli existujícím úkolem
    for (let task of tasks) {
        const existingStart = new Date(task.start);
        const existingEnd = task.end ? new Date(task.end) : null;

        // pokud je úkol ukončený
        if (existingEnd) {
            if (startTime >= existingStart && startTime < existingEnd) {
                alert("Čas začátku se překrývá s jiným úkolem!");
                return;
            }
        }
    }

    const task = {
        id: generateId(),
        name: name,
        start: startTime.toISOString(),
        end: null
    };

    tasks.push(task);
    saveTasks();
    render();
}

function endTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.end = new Date().toISOString();
        saveTasks();
        render();
    }
}

function deleteTask(id) {
    if (!confirm("Opravdu chcete tento úkol smazat?")) return;

    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    render();
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("taskForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("taskName").value.trim();
        const startValue = document.getElementById("taskStart").value;

        if (name) {
            startTask(name, startValue);
            this.reset();
        }
    });

    setInterval(render, 1000);
    render();
});