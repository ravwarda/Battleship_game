const poleGry = document.querySelector("#player");
const pola = [];
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        pola[i, j] = document.createElement("div");
        pola[i, j].innerText = i + "," + j;
        poleGry.appendChild(pola[i, j]);
    }
}
const statki = [lotniskowiec = [], krazownik = [], niszczyciel = [], lodz = []];