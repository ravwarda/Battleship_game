const literki = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const poleGry = document.querySelector("#player");
let dlStatku = 5;

function strzal(i, j) {
    for (let d = 0; d < dlStatku; d++) {
        if (j + d < 11) {
            kratki[i][j+d].czyStatek = true;
            kratki[i][j+d].pole.style.backgroundColor = "rgb(80, 80, 80)";
            dlStatku--;
        }
        if (dlStatku <= 1) {
            
        }
    }
}

function ustawKratke(znak, i, j) {
        kratki[i][j] = document.createElement("div");
        kratki[i][j].innerText = znak;
        poleGry.appendChild(kratki[i][j]);
}

class kratka {

    czyTrafione = false;
    czyStatek = false;
    czyStatekObok = false;

    constructor(pole) {
        this.pole = pole;
    }
}

const kratki = [];
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        if (i == 0 && j == 0) {
            kratki[0] = [];
            ustawKratke("\\",i,j);
        }
        else if (j == 0) {
            kratki[i] = [];
            ustawKratke(i,i,j);
        }
        else if (i == 0) {
            ustawKratke(literki[j - 1],i,j);
        }
        else {
            kratki[i][j] = new kratka(document.createElement("div"));
            poleGry.appendChild(kratki[i][j].pole);
            kratki[i][j].pole.addEventListener("click", function() {
                strzal(i,j);
            });
        }

    }
}