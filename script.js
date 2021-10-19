const poleGry = document.querySelector("#player");
const miejsca = []; //obiekty z miejscem, czy  trafione, czy stoi na nich statek

for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        miejsca[i, j] = document.createElement("div");
        miejsca[i, j].innerText = i + "," + j;
        poleGry.appendChild(miejsca[i, j]);
    }
}
