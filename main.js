//tema intunecata
const html = document.querySelector("html");
const darkModeButton = document.querySelector("#darkMode");
const numeNou = document.querySelector("#numeNou");
const intrebareNoua = document.querySelector("#intrebareNoua");
const raspunsNou = document.querySelector("#raspunsNou");
const adaugareIntrebare = document.querySelector("#adaugareIntrebare");
const setNou = document.querySelector("#setNou");
const form = document.querySelector(".formularRaspuns");
const comanda = document.querySelector(".comanda");
const raspuns = document.querySelector("#raspuns");
const arataRaspuns = document.querySelector("#arata-raspunsul");
const intrebareaUrmatoare = document.querySelector("#intrebareaUrmatoare");

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

let teste = [];
scoatereTeste();

function scoatereTeste() {
   if (localStorage.getItem("teste") != null)
      teste = JSON.parse(localStorage.getItem("teste"));
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
// functii trigonometrice inverse

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

function intrebariProprietate(obj, lista) {
   let keys = Object.keys(obj);

   keys.shift();
   let q, a;
   for (let i = 0; i < keys.length; i++) {
      q = `Scrieti ce ${keys[i]} pentru functia ${obj.nume}`;
      a = obj[keys[i]];
      lista.push(new intrebareRaspuns(q, a));
   }
   return lista;
}

function listaOg() {
   let og = [];
   const variante = [arctg, arcctg, arcsin, arccos];
   for (let i in variante) intrebariProprietate(variante[i], og);
   /* let funtieAleatoare = variante[Math.floor(Math.random() * 4)];
   let proprietateAleasa = intrebariProprietate(funtieAleatoare, aqaqaq); */
   return og;
}

// afisare seturi de intrebari si alegere
const alegereSetIntrebari = document.querySelector("#alegereSetIntrebari");
parcurgereTeste();

function parcurgereTeste() {
   for (let i = 0; i < teste.length; i++) afisareSeturiIntrebari(teste[i]);
}

function afisareSeturiIntrebari(test) {
   const lista = alegereSetIntrebari.querySelector("form");
   let radio = document.createElement("input");
   radio.setAttribute("type", "radio");
   radio.setAttribute("name", "set");
   radio.setAttribute("id", `${test.nume}`);
   lista.insertBefore(radio, lista.querySelector("#og"));
   let label = document.createElement("label");
   label.setAttribute("for", `${test.nume}`);
   label.appendChild(document.createTextNode(`${test.nume}`));
   lista.insertBefore(label, lista.querySelector("#og"));
   lista.insertBefore(document.createElement("br"), lista.querySelector("#og"));
}

// adaugare set nou de date

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
      afisareSeturiIntrebari(aux);
   } else alert("Nu se poate crea set de date fara intrebari");
}

// procesare alegere set date
let listaActiva = [];

alegereSetIntrebari.addEventListener("submit", alegereSetActiv);

function alegereSetActiv(e) {
   e.preventDefault();
   const radioButtons = alegereSetIntrebari.querySelectorAll("input[name=set]");
   let numeSetActiv, obiectActiv;
   for (let i = 0; i < radioButtons.length; i++) {
      const rb = radioButtons[i];
      if (rb.checked) {
         numeSetActiv = rb.id;
         obiectActiv = teste[i];
         break;
      }
   }
   switch (numeSetActiv) {
      case "og":
         listaActiva = listaOg();
         break;
      case "nou":
         // de adaugat toggle pentru vizibilitate sectiuni
         break;
      default:
         listaActiva = obiectActiv.listaIntrebari;
         break;
   }
   console.log(listaActiva);
}

// verificare

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
