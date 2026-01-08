const quotes = [
    "Programování je myšlení, ne psaní kódu.",
    "Kód je jako vtip. Pokud ho musíš vysvětlovat, je špatný.",
    "Programátor je stroj, který přeměňuje kofein na kód.",
    "Dvakrát měř, jednou programuj.",
    "Chyba není v počítači, chyba je v tobě.",
    "Software je plyn, který se rozpíná, dokud nevyplní veškerou paměť.",
    "Debugging je jako být detektivem v kriminálním románu, kde jsi sám zločinec.",
    "Kód, který píšeš dnes, budeš zítra nenávidět.",
    "Nejlepší kód je ten, který nikdy nemusíš psát.",
    "Programování je umění skrýt složitost za jednoduchostí.",
    "Kódování bez testování je jako jít do boje bez brnění.",
    "Když něco funguje, nikdy to neměň.",
    "Kód je poezie techniky."
];

const quoteEl = document.getElementById("quote-display");
//const quoteEl = document.querySelector("header > p");

function setQuote(quote) {
    // ALTGR + 7 = `
    quoteEl.innerText = `${quote}`;
    //quoteEl.innerHTML = "<h1>" + quote + "</h1>";
}

let lastIndex = 0;
function randomizeQuote() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * Math.random() * 10000) % quotes.length;
        console.log("generace");
    } while (lastIndex === randomIndex);
    lastIndex = randomIndex;
    console.log(randomIndex);
    setQuote(quotes[randomIndex]);
}

export default function initializeQuotes() {
    setInterval(randomizeQuote, 5000);
}

/*
quoteEl.addEventListener("click", () => {
    randomizeQuote();
});
*/