// Ejercicio 3: pila (LIFO) de libros
class Stack {
  constructor() {
    this.items = [];
  }
  push(valor) { this.items.push(valor); }                        // agrega al final
  pop() { return this.items.pop(); }                             // quita y retorna el último
  peek() { return this.isEmpty() ? null : this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
  print() {                                                      // orden LIFO
    for (let i = this.items.length - 1; i >= 0; i--) {
      const l = this.items[i];
      console.log(`${l.nombre} | ISBN: ${l.isbn} | Autor: ${l.autor} | Editorial: ${l.editorial}`);
    }
  }
}

// ---------- Prueba con datos ficticios ----------
const pila = new Stack();
pila.push({ nombre: "Cien años de soledad", isbn: "978-0307474728", autor: "Gabriel García Márquez", editorial: "Sudamericana" });
pila.push({ nombre: "El coronel no tiene quien le escriba", isbn: "978-0060884772", autor: "Gabriel García Márquez", editorial: "Oveja Negra" });
pila.push({ nombre: "La vorágine", isbn: "978-9588293011", autor: "José Eustasio Rivera", editorial: "Panamericana" });
pila.push({ nombre: "María", isbn: "978-9580106180", autor: "Jorge Isaacs", editorial: "Norma" });

console.log("Pila de libros (el de arriba es el primero):");
pila.print();
console.log("\nTamaño:", pila.size());
console.log("Tope (peek):", pila.peek().nombre);
console.log("Pop:", pila.pop().nombre);
console.log("Nuevo tope:", pila.peek().nombre);
console.log("¿Vacía?", pila.isEmpty());
