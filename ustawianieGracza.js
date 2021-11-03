let dlStatku = 5, ilStatkow = 0, ustawionoGracza = false;

function sprPozycjeStatku(i, j, kratki) {
    function ustawStatek() {
        ilStatkow++;
        if (ilStatkow == 1 || ilStatkow == 2 || ilStatkow == 5) {
          dlStatku--;
        } else if (ilStatkow >= 9) {
          dlStatku = 0;
          ustawionoGracza = true;
        }
      }

      console.log("i: "+i+" j: "+j);
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
      for (let d = 0; d < dlStatku; d++) {
        kratki[i + d][j].ustawPoleStatek();
      }
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
      for (let d = 0; d < dlStatku; d++) {
        kratki[i][j + d].ustawPoleStatek();
      }
      ustawStatek();
    }
  }
}

// obsługa zmiany kierunku tworzenia statków
let pion = false;
document.querySelector("#obrot").addEventListener("click", function() {
  if (pion == true) {
    pion = false;
  } else {
    pion = true;
  }
});