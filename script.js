const literki = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const poleGry = document.querySelector("#player");
let dlStatku = 5, ilStatkow = 0;

// obsługa zmiany kierunku tworzenia statków
let pion = false;
document.querySelector("#obrot").addEventListener("click", function() {
    if (pion == true) {
        pion = false;
    } else {
        pion = true;
    }
});

function sprPozycjeStatku(i, j) {
    if (pion == true) {
        if (i + dlStatku <= 11) {
            for (let d = 0; d < dlStatku; d++) {
                kratki[i+d][j].ustawPoleStatek();
            }
            ustawStatek();
        }
    }
    else {
        if (j + dlStatku <= 11) {
            for (let d = 0; d < dlStatku; d++) {
                    kratki[i][j+d].ustawPoleStatek();
            }
            ustawStatek();
        }
    } 
}

function ustawStatek() {
    ilStatkow++;
            if (ilStatkow == 1 || ilStatkow == 3 || ilStatkow == 6) {
                dlStatku--;
            }
            else if (ilStatkow >= 9) {
                dlStatku--;
                dlStatku = 0;
            }
}

// funkcja do tworzenia kratek opisujących pole gry
function ustawKratke(znak, i, j) {
        kratki[i][j] = document.createElement("div");
        kratki[i][j].innerText = znak;
        kratki[i][j].classList = "poleOpisowe"
        poleGry.appendChild(kratki[i][j]);
}

// obiekt pojedynczego pola gry
class kratka {

    czyTrafione = false;
    czyStatek = false;
    czyStatekObok = false;

    constructor(pole) {
        this.pole = pole;
    }

    ustawPoleStatek() {
        this.czyStatek = true;
        this.pole.style.backgroundColor = "rgb(80, 80, 80)";
    }

    ustawionyStatekObok() {
        this.czyStatekObok = true;
        this.pole.style.backgroundColor = "rgb(255, 100, 100)";
    }
}

// tworzenie pola gry dla gracza
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
                sprPozycjeStatku(i,j);
            });
        }

    }
}