const inputEl = document.querySelector('.adder input');
const btnEl = document.querySelector('.adder button');
const ulEl = document.querySelector('ul');

btnEl.addEventListener('click', e => {
    e.preventDefault();
    let newEl = document.createElement("li");
    let buttonUp = document.createElement("button");
    buttonUp.textContent = "nahoru";
    let buttonDown = document.createElement("button");
    buttonDown.textContent = "dolu";
    let span = document.createElement("span");
    span.innerText = inputEl.value;

    newEl.appendChild(buttonUp);
    newEl.appendChild(buttonDown);
    newEl.appendChild(span);
    ulEl.appendChild(newEl);
})