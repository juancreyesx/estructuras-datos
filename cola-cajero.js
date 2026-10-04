// Ejercicio 4: cola (FIFO) de personas en un cajero automático
class Queue {
  constructor() {
    this.items = [];
  }
  encolar(valor) { this.items.push(valor); }                 // agrega al final
  descolar() { return this.items.shift(); }                  // quita al primero
  peek() { return this.isEmpty() ? null : this.items[0]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  print() {                                                  // orden natural
    this.items.forEach((p) => {
      console.log(`${p.hora} | ${p.nombre} | Retiro: $${p.monto}`);
    });
  }
}

// El sistema asigna una hora de llegada aleatoria entre 08:00 y 17:59
function horaAleatoria() {
  const minutosTotales = 8 * 60 + Math.floor(Math.random() * (10 * 60));
  const h = String(Math.floor(minutosTotales / 60)).padStart(2, "0");
  const m = String(minutosTotales % 60).padStart(2, "0");
  return `${h}:${m}`;
}

// Convierte "HH:MM" a minutos para poder ordenar
const aMinutos = (hora) => {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
};

// 1. Estructura auxiliar (arreglo) con personas en desorden de llegada
const personas = [
  { nombre: "Camila Ortiz", monto: 200000, hora: horaAleatoria() },
  { nombre: "Andrés Mejía", monto: 50000, hora: horaAleatoria() },
  { nombre: "Valentina Ruiz", monto: 350000, hora: horaAleatoria() },
  { nombre: "Santiago Pérez", monto: 100000, hora: horaAleatoria() },
  { nombre: "Laura Gómez", monto: 80000, hora: horaAleatoria() },
];

console.log("Personas antes de ordenar (arreglo auxiliar):");
personas.forEach((p) => console.log(`${p.hora} | ${p.nombre}`));

// 2. Ordenar por hora de llegada
personas.sort((a, b) => aMinutos(a.hora) - aMinutos(b.hora));

// 3. Encolar en orden cronológico
const cola = new Queue();
personas.forEach((p) => cola.encolar(p));

// 4. Imprimir la cola
console.log("\nCola del cajero (en orden de llegada):");
cola.print();
console.log("\nSiguiente en ser atendido:", cola.peek().nombre);
console.log("Personas en la cola:", cola.size());
