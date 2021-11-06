// obekt statku w grze
class statek {
    ilTrafien = 0;
    czyZatopiony = false;
  
    constructor(dl) {
      this.dl = dl;
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
      this.czyStatekObok = true;
      this.pole.style.backgroundColor = "rgb(255, 100, 100)";
    }
  
    Strzal() {
      if (this.czyTrafione == false) {
        if (this.czyStatek == true) {
          this.pole.style.backgroundColor = "rgb(255, 0, 0)";
        }
        else {
          this.pole.style.backgroundColor = "rgb(25, 109, 205)";
        }
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