let dlStatku = 5, ilStatkowG = 0, ilStatkowP = 0;

// obsługa zmiany kierunku tworzenia statków
let pion = false;
pObrot = document.querySelector("#obrot");
pObrot.addEventListener("click", function () {
  if (pion == true) {
    pion = false;
  } else {
    pion = true;
  }
});

// obsługa resetowania pola gracza
pReset = document.querySelector("#reset");
pReset.addEventListener("click", function () {
  if (ustawionoPrzeciwnika == false) {
    ustawionoGracza = false;
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        kratkiG[i][j].Reset();
        ilStatkowG = 0;
        dlStatku = 5;
      }
    }
  }
});

// obsługa przycisku startu gry
pStart = document.querySelector("#start")
pStart.addEventListener("click", function () {
  if (ustawionoGracza == true && ustawionoPrzeciwnika == false) {
    ustawPrzeciwnika();
    pStart.style.display = "none";
    pObrot.style.display = "none";
    pReset.style.opacity = "50%";
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (kratkiG[i][j].czyStatekObok == true) {
          kratkiG[i][j].kolorReset();
        }
      }
    }
  }
});

// ustawianie statku
function sprPozycjeStatku(i, j, kratki, cel) {
  function ustawStatek() {
    let ilStatkow;
    if (kratki == kratkiG) {
      ilStatkowG++;
      ilStatkow = ilStatkowG;
    }
    else {
      ilStatkowP++;
      ilStatkow = ilStatkowP;
    }
    if (ilStatkow == 1 || ilStatkow == 2 || ilStatkow == 4) {
      dlStatku--;
    } else if (ilStatkow >= 8) {
      dlStatku = 0;
      ustawionoGracza = true;
      pStart.style.opacity = "100%";
    }
  }

  function pionowy() {
    if (kratki == kratkiG) {
      statkiG[ilStatkowG] = new statek(dlStatku);
      for (let d = 0; d < dlStatku; d++) {
        kratki[i + d][j].ustawPoleStatek(statkiG[ilStatkowG]);
      }
    }
    else {
      statkiP[ilStatkowP] = new statek(dlStatku);
      for (let d = 0; d < dlStatku; d++) {
        kratki[i + d][j].ustawPoleStatek(statkiP[ilStatkowP]);
      }
    }
  }

  function poziomy() {
    if (kratki == kratkiG) {
      statkiG[ilStatkowG] = new statek(dlStatku);
      for (let d = 0; d < dlStatku; d++) {
        kratki[i][j + d].ustawPoleStatek(statkiG[ilStatkowG]);
      }
    }
    else {
      statkiP[ilStatkowP] = new statek(dlStatku);
      for (let d = 0; d < dlStatku; d++) {
        kratki[i][j + d].ustawPoleStatek(statkiP[ilStatkowP]);
      }
    }
  }

  //console.log("i: " + i + " j: " + j);
  if (pion == true) {
    const ostatni = i + dlStatku - 1;
    if (ostatni <= 10) {
      for (let d = 0; d < dlStatku; d++) {
        if (
          kratki[i + d][j].czyStatekObok == true ||
          kratki[i + d][j].czyStatek == true
        ) {
          return 0;
        }
      }
      if (i != 1) {
        if (j != 1) {
          kratki[i - 1][j - 1].ustawionyStatekObok();
        }
        if (j != 10) {
          kratki[i - 1][j + 1].ustawionyStatekObok();
        }
        kratki[i - 1][j].ustawionyStatekObok();
      }
      if (ostatni != 10) {
        if (j != 1) {
          kratki[ostatni + 1][j - 1].ustawionyStatekObok();
        }
        if (j != 10) {
          kratki[ostatni + 1][j + 1].ustawionyStatekObok();
        }
        kratki[ostatni + 1][j].ustawionyStatekObok();
      }
      if (j != 1) {
        for (let d = 0; d < dlStatku; d++) {
          kratki[i + d][j - 1].ustawionyStatekObok();
        }
      }
      if (j != 10) {
        for (let d = 0; d < dlStatku; d++) {
          kratki[i + d][j + 1].ustawionyStatekObok();
        }
      }
      pionowy();
      ustawStatek();
    }
  } else {
    const ostatni = j + dlStatku - 1;
    if (ostatni <= 10) {
      for (let d = 0; d < dlStatku; d++) {
        if (
          kratki[i][j + d].czyStatekObok == true ||
          kratki[i][j + d].czyStatek == true
        ) {
          return 0;
        }
      }
      if (j != 1) {
        if (i != 1) {
          kratki[i - 1][j - 1].ustawionyStatekObok();
        }
        if (i != 10) {
          kratki[i + 1][j - 1].ustawionyStatekObok();
        }
        kratki[i][j - 1].ustawionyStatekObok();
      }
      if (ostatni != 10) {
        if (i != 1) {
          kratki[i - 1][ostatni + 1].ustawionyStatekObok();
        }
        if (i != 10) {
          kratki[i + 1][ostatni + 1].ustawionyStatekObok();
        }
        kratki[i][ostatni + 1].ustawionyStatekObok();
      }
      if (i != 1) {
        for (let d = 0; d < dlStatku; d++) {
          kratki[i - 1][j + d].ustawionyStatekObok();
        }
      }
      if (i != 10) {
        for (let d = 0; d < dlStatku; d++) {
          kratki[i + 1][j + d].ustawionyStatekObok();
        }
      }
      poziomy();
      ustawStatek();
    }
  }
}
