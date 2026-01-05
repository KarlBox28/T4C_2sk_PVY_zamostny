//alert("Pred nactenim stranky");
const tmp = "aaa";
let aaa = 5;
var bbb = 10;
//je lepsi pouzivat let a const misto var
//operatory: + - * / % ++ --
//porovnani: == === != !== > < >= <=
//logicke operatory: && || !
//u pole muzeme michat ruzne datove typy
let pole = [1, "2", 3, "4", 5, {a: 1, b: 2}];
let cisla = [10, 20, 30, 40, 50];
let suma = 0;
for (let i = 0; i < cisla.length; i++) {
    // == vs === 
    // == porovnava hodnotu bez ohledu na datovy typ
    // === porovnava hodnotu i datovy typ
    // !== - ! = = porovnava hodnotu i datovy typ pro nerovnost 
    if(cisla[i] === 30) {
        console.log("Nasel jsem 30");
    }
    console.log("Cislo na indexu " + i + " je " + cisla[i]);
    suma += cisla[i];
}
//forof = foreach
for (const element of pole) {
    console.log("Element je " + element);
}
//forin = zkraceny zapis pro for
for (const index in pole) {
    console.log("Element na indexu " + index + " je " + pole[index]);
}
console.log("Suma cisel je " + suma);

cisla.forEach(v => {
    console.log("Element je " + v);
});