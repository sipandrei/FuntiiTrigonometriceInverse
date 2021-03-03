const form = document.querySelector("form");
const comanda = document.querySelector("h1");
const raspuns = document.querySelector("#raspuns");

function inversa(nume, domeniu, codomeniu, monotonie, paritate) {
   this.nume = nume;
   this.domeniu = domeniu;
   this.codomeniu = codomeniu;
   this.monotonie = monotonie;
   this.paritate = paritate;
}
function alegeProprietate(obj) {
   var keys = Object.keys(obj);
   let proprietate = keys[Math.floor(keys.length * Math.random())];
   return [proprietate, obj[proprietate]];
}

const arctg = new inversa(
   "arctg",
   "reale",
   "(-pi/2; pi/2)",
   "crescatoare",
   "impara"
);
const arcctg = new inversa(
   "arcctg",
   "reale",
   "(0;pi)",
   "descrescatoare",
   "arcctg(-x)=pi-arcctg(x)"
);
const arcsin = new inversa(
   "arcsin",
   "[-1;1]",
   "[-pi/2;pi/2]",
   "crescatoare",
   "impara"
);
const arccos = new inversa(
   "arccos",
   "[-1,1]",
   "[0;pi]",
   "descrescatoare",
   "arccos(-x)=pi-arccos(x)"
);

const variante = [arctg, arcctg, arcsin, arccos];
let numarAleator = Math.floor(Math.random() * 4);
console.log(variante[numarAleator].nume);
console.log(alegeProprietate(variante[numarAleator]));
