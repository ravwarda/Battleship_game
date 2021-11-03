const literki = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const poleGracz = document.querySelector("#player");
const polePrzeciwnik = document.querySelector("#oponent");
let ustawionoPrzeciwnika = false;

// funkcja do tworzenia kratek opisujących pole gry
function ustawKratke(znak, i, j, kratki) {
  kratki[i][j] = document.createElement("div");
  kratki[i][j].innerText = znak;
  kratki[i][j].classList = "poleOpisowe";
  if (ustawionoGracza == false) {
    poleGracz.appendChild(kratki[i][j]);
  }
  else {
    polePrzeciwnik.appendChild(kratki[i][j]);
  }
}

// tworzenie pola gry przeciwnika
function ustawPrzeciwnika() {
  function los10() {
    return (Math.floor(Math.random() * 10) + 1);
  }
  let ilPrzed;

  dlStatku = 5;
  ilStatkow = 0;
  const kratkiP = [];
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (i == 0 && j == 0) {
        kratkiP[0] = [];
        ustawKratke("\\", i, j, kratkiP);
      } else if (j == 0) {
        kratkiP[i] = [];
        ustawKratke(i, i, j, kratkiP);
      } else if (i == 0) {
        ustawKratke(literki[j - 1], i, j, kratkiP);
      } else {
        kratkiP[i][j] = new kratka(document.createElement("div"));
        polePrzeciwnik.appendChild(kratkiP[i][j].pole);
      }
    }
  }
  while (dlStatku != 0) {
    if (Math.random() < 0.5) {
      pion = true;
    }
    else {
      pion = false;
    }
    ilPrzed = ilStatkow;
    sprPozycjeStatku(los10(), los10(), kratkiP);
    //if (ilPrzed != ilStatkow) {
    //  
    //}
  }
  polePrzeciwnik.style.display = "grid";
  ustawionoPrzeciwnika == true;
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

  kolorReset() {
    this.pole.style.backgroundColor = "rgb(65, 149, 245)";
  }
}

// tworzenie pola gry dla gracza
const kratkiG = [];
for (let i = 0; i < 11; i++) {
  for (let j = 0; j < 11; j++) {
    if (i == 0 && j == 0) {
      kratkiG[0] = [];
      ustawKratke("\\", i, j, kratkiG);
    } else if (j == 0) {
      kratkiG[i] = [];
      ustawKratke(i, i, j, kratkiG);
    } else if (i == 0) {
      ustawKratke(literki[j - 1], i, j, kratkiG);
    } else {
      kratkiG[i][j] = new kratka(document.createElement("div"));
      poleGracz.appendChild(kratkiG[i][j].pole);
      kratkiG[i][j].pole.addEventListener("click", function () {
        console.log(ustawionoGracza);
        if (ustawionoGracza == false) {
          sprPozycjeStatku(i, j, kratkiG);
        }
        else if (ustawionoPrzeciwnika == false) {
          ustawPrzeciwnika();
        }
      });
    }
  }
}