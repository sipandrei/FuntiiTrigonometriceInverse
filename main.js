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
const toateFormularele = document.querySelectorAll("form");
const rezultat = document.querySelector("#rezultat");
const containerRaspuns = document.querySelector("#container-raspuns");
const eliminaSetDate = document.querySelector("#eliminaSetDate");
const extindere = document.querySelectorAll(".extindere");
const deExtins = document.querySelectorAll(".deExtins");

toateFormularele.forEach(prevenireReincarcare);

for (let i = 0; i < extindere.length; i++) {
   extindere[i].addEventListener("click", () => extinde(i));
}
for (let i = 0; i < deExtins.length; i++) {
   deExtins[i].onclick = oprirePropagare;
}

function oprirePropagare(e) {
   e.stopPropagation();
}

function toggle(x) {
   switch (x) {
      case 0:
         deExtins[0].classList.remove("ascuns");
         deExtins[1].classList.add("ascuns");
         deExtins[2].classList.add("ascuns");
         break;
      case 1:
         deExtins[0].classList.add("ascuns");
         deExtins[1].classList.remove("ascuns");
         deExtins[2].classList.add("ascuns");
         break;
      case 2:
         deExtins[1].classList.add("ascuns");
         deExtins[0].classList.add("ascuns");
         deExtins[2].classList.remove("ascuns");
         break;
   }
}

function extinde(x) {
   if (deExtins[x].classList.contains("ascuns")) {
      toggle(x);
      if (deExtins[x].classList.contains("desc")) {
         deExtins[x].style.display = "block";
      }
   } else {
      deExtins[x].classList.add("ascuns");
      if (deExtins[x].classList.contains("desc")) {
         deExtins[x].style.display = "";
      }
   }
}

function prevenireReincarcare(e) {
   e.addEventListener("submit", reloadNo);
}

function reloadNo(e) {
   e.preventDefault();
}

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
function afisareComanda(vectorIntrebari, index) {
   comanda.innerText = `${index + 1}/${vectorIntrebari.length} - ${
      vectorIntrebari[index].intrebare
   }`;
}

function gasireButonActiv() {
   const radioButtons = alegereSetIntrebari.querySelectorAll("input[name=set]");
   let numeSetActiv, obiectActiv;
   for (let i = 0; i < radioButtons.length; i++) {
      const rb = radioButtons[i];
      if (rb.checked) {
         numeSetActiv = rb.id;
         obiectActiv = teste[i];
         return [numeSetActiv, obiectActiv];
      }
   }
}

function eliminareIntrebare() {
   let obiectActiv = gasireButonActiv()[1];
   const lista = alegereSetIntrebari.querySelector("form");
   for (let i = 0; i < teste.length; i++)
      if (obiectActiv === teste[i]) {
         teste.splice(i, 1);
         localStorage.setItem("teste", JSON.stringify(teste));
         lista.removeChild(lista.querySelectorAll("input[type='radio']")[i]);
         lista.removeChild(lista.querySelectorAll("label")[i]);
         lista.removeChild(lista.querySelectorAll("br")[i]);
         break;
      }
   console.log(teste);
}

eliminaSetDate.addEventListener("click", eliminareIntrebare);

let listaActiva = listaOg();
let numarulIntrebarii = 0;
let scor = 0;
afisareComanda(listaActiva, numarulIntrebarii);

alegereSetIntrebari.addEventListener("submit", alegereSetActiv);

function alegereSetActiv(e) {
   e.preventDefault();
   let numeSetActiv = gasireButonActiv()[0];
   let obiectActiv = gasireButonActiv()[1];
   switch (numeSetActiv) {
      case "og":
         listaActiva = listaOg();
         break;
      case "nou":
         toggle(1);
         break;
      default:
         listaActiva = obiectActiv.listaIntrebari;
         toggle(2);
         break;
   }

   intrebareaUrmatoare.addEventListener("click", schimbareIntrebare);
   scor = 0;
   numarulIntrebarii = 0;
   afisareComanda(listaActiva, numarulIntrebarii);
   listaActiva.length == 1
      ? (intrebareaUrmatoare.value = "Afisare Rezultate")
      : (intrebareaUrmatoare.value = "Intrebarea Urmatoare");
}

// verificare

form.addEventListener("submit", verificareRaspuns);
arataRaspuns.addEventListener("click", aratareRaspuns);
intrebareaUrmatoare.addEventListener("click", schimbareIntrebare);

function schimbareIntrebare() {
   if (numarulIntrebarii == listaActiva.length - 2) {
      numarulIntrebarii += 1;
      intrebareaUrmatoare.value = "Afisare Rezultate";
      reinitializareIntrebare();
   } else if (numarulIntrebarii < listaActiva.length - 1) {
      numarulIntrebarii += 1;
      intrebareaUrmatoare.value = "Intrebarea Urmatoare";
      reinitializareIntrebare();
   } else {
      intrebareaUrmatoare.removeEventListener("click", schimbareIntrebare);
      rezultat.textContent = `Ati raspuns corect la ${scor}/${listaActiva.length} intrebari!`;
   }
}

function reinitializareIntrebare() {
   afisareComanda(listaActiva, numarulIntrebarii);
   form.addEventListener("submit", verificareRaspuns);
   containerRaspuns.innerText = "";
   rezultat.innerText = "";
   raspuns.innerText = "";
}

function verificareRaspuns(e) {
   e.preventDefault();
   if (raspuns.value == listaActiva[numarulIntrebarii].raspuns) {
      console.log("Adevarat");
      rezultat.textContent = "Adevarat!";
      scor += 1;
   } else {
      console.log("Gresit!");
      rezultat.textContent = "Gresit!";
   }
   raspuns.value = "";
   form.removeEventListener("submit", verificareRaspuns);
}

function aratareRaspuns() {
   const intr = listaActiva[numarulIntrebarii].intrebare;
   const rsp = listaActiva[numarulIntrebarii].raspuns;

   console.log(intr + " : " + rsp);
   rezultat.textContent = "Butonul de verificare a fost dezactivat!";
   containerRaspuns.textContent = `Raspunsul corect pentru intrebarea "${intr}" este : ${rsp}`;
   form.removeEventListener("submit", verificareRaspuns);
}
