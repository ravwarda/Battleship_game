const literki = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const statkiG = [], statkiP = [];
const poleGracz = document.querySelector("#player");
const polePrzeciwnik = document.querySelector("#oponent");
let  ustawionoGracza = false, ustawionoPrzeciwnika = false, turaGracza = true;

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
  const SI = {
    zatopiony: false,
    poprzedniTrafiony: false,
    ilTrafien: 0,
    // przygotowywany strzał
    akCel: [],
    // pierwszy strzał w dany statek i poprzedni strzał
    wczCel: [],

    // funkcja wyznaczająca współrzędne następnego strzału, a następnie zapisująca je do akCel
    wyznaczCel() {
      if (this.ilTrafien == 1) {
        let kierunek = Math.random();
        if (kierunek < 0.25) {
          this.akCel[0] = this.wczCel[0] + 1;
          this.akCel[1] = this.wczCel[1];
        } else if (kierunek < 0.50) {
          this.akCel[0] = this.wczCel[0] - 1;
          this.akCel[1] = this.wczCel[1];
        } else if (kierunek < 0.75) {
          this.akCel[1] = this.wczCel[1] + 1;
          this.akCel[0] = this.wczCel[0];
        } else {
          this.akCel[1] = this.wczCel[1] - 1;
          this.akCel[0] = this.wczCel[0];
        }
        this.wczCel[2] = this.wczCel[0];
        this.wczCel[3] = this.wczCel[1];
      }
      else if ((this.ilTrafien > 1 && this.poprzedniTrafiony != true) || this.akCel[0] == 0 || this.akCel[0] == 11 || this.akCel[1] == 0 || this.akCel[1] == 11) {
        this.akCel[0] = this.wczCel[2] + (this.wczCel[0] - this.akCel[0]);
        this.akCel[1] = this.wczCel[3] + (this.wczCel[1] - this.akCel[1]);
        this.wczCel[2] = this.wczCel[0];
        this.wczCel[3] = this.wczCel[1];
      }
      else if (this.ilTrafien > 1) {
        this.akCel[2] = this.akCel[0];
        this.akCel[3] = this.akCel[1];
        this.akCel[0] += this.akCel[0]-this.wczCel[2];
        this.akCel[1] += this.akCel[1]-this.wczCel[3];
        this.wczCel[2] = this.akCel[2];
        this.wczCel[3] = this.akCel[3];
      }
      else {
        this.akCel[0] = los10();
        this.akCel[1] = los10();
        this.wczCel[0] = this.akCel[0];
        this.wczCel[1] = this.akCel[1];
      }
    },

    trafienie() {
      this.poprzedniTrafiony = true;
      this.ilTrafien++;
    },
    
    pudlo() {
      this.poprzedniTrafiony = false;
    },

    zatopienie() {
      this.poprzedniTrafiony = false;
      this.ilTrafien = 0;
    }
  }

  // funkcja losująca liczbę z zakresu 1-10
  function los10() {
    return (Math.floor(Math.random() * 10) + 1);
  }

  // funkcja przebiegu 1 tury wywoływana kliknięciem na kratkę pola przeciwnika
  function tura(i, j) {
    function turaPrzeciwnika() {
      setTimeout(function () {
        do {
          do {
            SI.wyznaczCel();
            i = SI.akCel[0];
            j = SI.akCel[1];
          } while (i == 0 || j == 0 || i == 11 || j == 11);
        } while (kratkiG[i][j].czyTrafione == true);
        kratkiG[i][j].strzal();
        if (kratkiG[i][j].czyStatek == true) {
          SI.trafienie();
          let akStatek = kratkiG[i][j].obStatek;
          if (akStatek.czyZatopiony == true) {
            sprPozycjeStatku(akStatek.poczatek[0], akStatek.poczatek[1], kratkiG, 'z');
            SI.zatopienie();
          }
          if (ilStatkowG == 0) {
            alert("porażka");
            return 0;
          }
          else {
            turaPrzeciwnika();
          }
        }
        else {
          SI.pudlo();
        }
      },100);
    }

    kratkiP[i][j].strzal();
    if (kratkiP[i][j].czyStatek == true) {
      let akStatek = kratkiP[i][j].obStatek;
      if (akStatek.czyZatopiony == true) {
        sprPozycjeStatku(akStatek.poczatek[0], akStatek.poczatek[1], kratkiP, 'z');
      }
      if (ilStatkowP == 0) {
        alert("zwycięstwo");
        return 0;
      }
      return 0;
    }
    turaPrzeciwnika();
  }

  dlStatku = 5;
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
        kratkiP[i][j].pole.addEventListener("click", function () {
          if (turaGracza == true && kratkiP[i][j].czyTrafione == false) {
            turaGracza = false;
            tura(i, j);
            turaGracza = true;
          }
        });
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
    sprPozycjeStatku(los10(), los10(), kratkiP, 's');
  }
  for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
      kratkiP[i][j].kolorReset();
    }
  }
  polePrzeciwnik.style.display = "grid";
  ustawionoPrzeciwnika = true;
}

// tworzenie pola gry dla gracza
const kratkiG = [];
const kratkiP = [];
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
        //console.log(ustawionoGracza);
        if (ustawionoGracza == false) {
          sprPozycjeStatku(i, j, kratkiG, 's');
        }
      });
    }
  }
}