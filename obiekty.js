// obekt statku w grze
class statek {
  ilTrafien = 0;
  czyZatopiony = false;

  constructor(dl, pionowy, i, j) {
    this.dl = dl;
    this.pionowy = pionowy;
    this.poczatek = [i, j];
  }

  trafienie() {
      pion = this.pionowy;
      dlStatku = this.dl;
      this.ilTrafien++;
      if (this.ilTrafien == this.dl) {
          this.czyZatopiony = true;
      }
  }
}

// obiekt pojedynczego pola gry
class kratka {
  czyTrafione = false;
  czyStatek = false;
  czyStatekObok = false;
  obStatek;

  constructor(pole) {
    this.pole = pole;
  }

  ustawPoleStatek(obStatek) {
    this.czyStatek = true;
    this.pole.style.backgroundColor = "rgb(80, 80, 80)";
    this.obStatek = obStatek;
  }

  ustawionyStatekObok() {
    if (ustawionoGracza == true && ustawionoPrzeciwnika == true) {
        this.czyTrafione = true;
        this.pole.style.backgroundColor = "rgb(25, 109, 205)";
    }
    else {
        this.czyStatekObok = true;
        this.pole.style.backgroundColor = "rgb(255, 100, 100)";
    }
  }

  strzal() {
    if (this.czyTrafione == false) {
      if (this.czyStatek == true) {
        this.pole.style.backgroundColor = "rgb(255, 0, 0)";
        this.obStatek.trafienie();
      }
      else {
        this.pole.style.backgroundColor = "rgb(25, 109, 205)";
      }
      this.czyTrafione = true;
    }
  }

  kolorReset() {
    this.pole.style.backgroundColor = "rgb(65, 149, 245)";
  }

  Reset() {
    this.pole.style.backgroundColor = "rgb(65, 149, 245)";
    this.czyStatek = false;
    this.czyStatekObok = false;
  }
}