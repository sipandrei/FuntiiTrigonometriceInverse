//tema intunecata
const html = document.querySelector("html");
const darkModeButton = document.querySelector("#darkMode");
defaultTheme();

function defaultTheme() {
   if (localStorage.getItem("theme") === null) {
      html.dataset.theme = "theme-light";
      darkModeButton.src = "img/moon.svg";
   } else {
      html.dataset.theme = localStorage.getItem("theme");
      darkModeButton.src = localStorage.getItem("theme-icon");
   }
}
function schimbaTema() {
   if (html.dataset.theme == "theme-light") {
      localStorage.setItem("theme", "theme-dark");
      localStorage.setItem("theme-icon", "img/sun.svg");
   } else {
      localStorage.setItem("theme", "theme-light");
      localStorage.setItem("theme-icon", "img/moon.svg");
   }
   html.dataset.theme = localStorage.getItem("theme");
   darkModeButton.src = localStorage.getItem("theme-icon");
}

// functii trigonometrice inverse
const form = document.querySelector(".formularRaspuns");
const comanda = document.querySelector(".comanda");
const raspuns = document.querySelector("#raspuns");
const arataRaspuns = document.querySelector("#arata-raspunsul");
let teste = [];
scoatereTeste();

function scoatereTeste() {
   if (localStorage.getItem("teste") != null)
      JSON.parse(localStorage.getItem("teste"));
}
function setDate(nume, listaIntrebari) {
   this.nume = nume;
   this.listaIntrebari = listaIntrebari;
}

function intrebareRaspuns(intrebare, raspuns) {
   this.intrebare = intrebare;
   this.raspuns = raspuns;
}

function creareFunctie(nume, domeniu, codomeniu, monotonie, paritate) {
   this.nume = nume;
   this.domeniu = domeniu;
   this.codomeniu = codomeniu;
   this.monotonie = monotonie;
   this.paritate = paritate;
}
function alegeProprietate(obj) {
   let keys = Object.keys(obj);
   let proprietate = keys[Math.floor((keys.length - 1) * Math.random()) + 1];
   return [proprietate, obj[proprietate]];
}

const arctg = new creareFunctie(
   "arctg",
   "reale",
   "(-pi/2;pi/2)",
   "crescatoare",
   "impara"
);
const arcctg = new creareFunctie(
   "arcctg",
   "reale",
   "(0;pi)",
   "descrescatoare",
   "arcctg(-x)=pi-arcctg(x)"
);
const arcsin = new creareFunctie(
   "arcsin",
   "[-1;1]",
   "[-pi/2;pi/2]",
   "crescatoare",
   "impara"
);
const arccos = new creareFunctie(
   "arccos",
   "[-1;1]",
   "[0;pi]",
   "descrescatoare",
   "arccos(-x)=pi-arccos(x)"
);

const variante = [arctg, arcctg, arcsin, arccos];
let funtieAleatoare = variante[Math.floor(Math.random() * 4)];
let proprietateAleasa = alegeProprietate(funtieAleatoare);

comanda.innerText = `Scrieti ce ${proprietateAleasa[0]} are ${funtieAleatoare.nume}`;

form.addEventListener("submit", verificareRaspuns);
arataRaspuns.addEventListener("click", aratareRaspuns);

function verificareRaspuns(e) {
   e.preventDefault();
   const rezultat = document.querySelector("#rezultat");
   if (raspuns.value == proprietateAleasa[1]) {
      console.log("Adevarat");
      rezultat.textContent = "Adevarat!";
   } else {
      console.log("Gresit!");
      rezultat.textContent = "Gresit!";
   }
   raspuns.value = "";
}
function aratareRaspuns() {
   const containerRaspuns = document.querySelector("#container-raspuns");
   console.log(proprietateAleasa[0] + " : " + proprietateAleasa[1]);
   containerRaspuns.textContent = `Raspunsul corect pentru "${proprietateAleasa[0]}" este : ${proprietateAleasa[1]}`;
}

// adaugare set nou de date
const numeNou = document.querySelector("#numeNou");
const intrebareNoua = document.querySelector("#intrebareNoua");
const raspunsNou = document.querySelector("#raspunsNou");
const adaugareIntrebare = document.querySelector("#adaugareIntrebare");
const setNou = document.querySelector("#setNou");

let intrebariDeAdaugat = [];

adaugareIntrebare.addEventListener("click", aditieLaCoada);
setNou.addEventListener("submit", terminareSetNou);

function afisareCoadaIntrebari() {
   const coadaIntrebari = document.querySelector("#coadaIntrebari");
   let li = document.createElement("li");
   const ultimIndex = intrebariDeAdaugat.length - 1;
   let liContent = `${intrebariDeAdaugat[ultimIndex].intrebare} - ${intrebariDeAdaugat[ultimIndex].raspuns}`;
   li.appendChild(document.createTextNode(liContent));
   coadaIntrebari.appendChild(li);
}

function aditieLaCoada() {
   let intrebareSetNou = intrebareNoua.value;
   let raspunsSetNou = raspunsNou.value;
   if (intrebareSetNou != "" && raspunsSetNou != "") {
      let aux = new intrebareRaspuns(intrebareSetNou, raspunsSetNou);
      intrebariDeAdaugat.push(aux);
      intrebareNoua.value = "";
      raspunsNou.value = "";
      afisareCoadaIntrebari();
   } else alert("Trebuie sa adaugati o intrebare si un raspuns");
}

function stergereListaCoada(lista) {
   while (lista.hasChildNodes()) {
      lista.firstChild.remove();
   }
}

function terminareSetNou(e) {
   e.preventDefault();
   if (intrebareNoua.value != "") aditieLaCoada();
   if (intrebariDeAdaugat.length) {
      aux = new setDate(numeNou.value, intrebariDeAdaugat);
      intrebariDeAdaugat = [];
      teste.push(aux);
      const coadaIntrebari = document.querySelector("#coadaIntrebari");
      stergereListaCoada(coadaIntrebari);
      localStorage.setItem("teste", JSON.stringify(teste));
      numeNou.value = "";
   } else alert("Nu se poate crea set de date fara intrebari");
}
