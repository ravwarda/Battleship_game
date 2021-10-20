const literki = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const poleGry = document.querySelector("#player");

function strzal(i,j) {
    console.log("paf" + i + j);
}

class kratka {

    czyTrafione = false;
    czyStatek = false;

    constructor(pole) {
        this.pole = pole;
    }
}

const kratki = [];
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        kratki[i, j] = new kratka(document.createElement("div"));
        if (i == 0 && j == 0) {
            kratki[0, j] = document.createElement("div");
            kratki[0, 0].innerText = "/";
            poleGry.appendChild(kratki[i, j]);
        }
        else if (i == 0) {
            kratki[0, j] = document.createElement("div");
            kratki[0, j].innerText = literki[j - 1];
            poleGry.appendChild(kratki[i, j]);
        }
        else if (j == 0) {
            kratki[i, 0] = document.createElement("div");
            kratki[i, 0].innerText = i;
            poleGry.appendChild(kratki[i, j]);
        }
        else {
            kratki[i, j] = new kratka(document.createElement("div"));
            poleGry.appendChild(kratki[i, j].pole);
            kratki[i, j].pole.addEventListener("click", function() {
                strzal(i,j);
            });
        }

    }
}