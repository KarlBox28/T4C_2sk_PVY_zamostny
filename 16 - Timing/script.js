let id;

id = setTimeout(Redirect,10000);

document.addEventListener("scroll", () => {
    clearTimeout(id);
    id = setTimeout(Redirect, 10000);

});

document.addEventListener("mousemove", () => {
    clearTimeout(id);
    id = setTimeout(Redirect, 10000);

});

document.addEventListener("keydown", () => {
    clearTimeout(id);
    id = setTimeout(Redirect, 10000);

});

document.addEventListener("click", () => {
    clearTimeout(id);
    id = setTimeout(Redirect, 10000);

});



function Redirect() {
    window.location.href = "https://sssvt.cz";
}