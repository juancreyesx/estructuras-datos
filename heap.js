// Ejercicio 8: heap (montículo) mínimo usado como cola de prioridad de tareas
// Un heap es un árbol binario COMPLETO guardado en un arreglo:
//   hijo izquierdo de i = 2i + 1, hijo derecho = 2i + 2, padre = floor((i - 1) / 2)
// En un min-heap el padre siempre tiene prioridad menor o igual que sus hijos,
// así que la raíz (posición 0) es siempre el elemento más urgente.
class MinHeap {
  constructor() {
    this.items = []; // cada item: { prioridad, valor }
  }

  size() { return this.items.length; }
  isEmpty() { return this.items.length === 0; }
  peek() { return this.items.length ? this.items[0] : null; }

  // Insertar: se agrega al final y se "sube" mientras sea menor que su padre. O(log n)
  insertar(prioridad, valor) {
    this.items.push({ prioridad, valor });
    let i = this.items.length - 1;
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.items[padre].prioridad <= this.items[i].prioridad) break;
      [this.items[padre], this.items[i]] = [this.items[i], this.items[padre]];
      i = padre;
    }
  }

  // Extraer el mínimo: se saca la raíz, el último pasa a la raíz y se "baja". O(log n)
  extraerMin() {
    if (this.isEmpty()) return null;
    const minimo = this.items[0];
    const ultimo = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = ultimo;
      let i = 0;
      while (true) {
        const izq = 2 * i + 1;
        const der = 2 * i + 2;
        let menor = i;
        if (izq < this.items.length && this.items[izq].prioridad < this.items[menor].prioridad) menor = izq;
        if (der < this.items.length && this.items[der].prioridad < this.items[menor].prioridad) menor = der;
        if (menor === i) break;
        [this.items[menor], this.items[i]] = [this.items[i], this.items[menor]];
        i = menor;
      }
    }
    return minimo;
  }

  // Muestra el arreglo interno del heap (no está ordenado del todo, solo cumple la propiedad del heap)
  print() {
    console.log("Heap (arreglo):", this.items.map((x) => `${x.prioridad}:${x.valor}`).join(" | "));
  }
}

// ---- Demostración: urgencias de un hospital (1 = más urgente) ----
const urgencias = new MinHeap();
urgencias.insertar(3, "Paciente con dolor de cabeza");
urgencias.insertar(1, "Paciente con paro cardíaco");
urgencias.insertar(4, "Paciente con control de rutina");
urgencias.insertar(2, "Paciente con fractura");
urgencias.insertar(5, "Paciente con receta médica");

urgencias.print();
console.log("Siguiente a atender:", urgencias.peek().valor);
console.log("\nAtendiendo en orden de prioridad:");
while (!urgencias.isEmpty()) {
  const p = urgencias.extraerMin();
  console.log(`- (${p.prioridad}) ${p.valor}`);
}

if (typeof module !== "undefined") module.exports = { MinHeap };
