// Ejercicio 1: lista simplemente enlazada de canciones
class Nodo {
  constructor(value) {
    this.value = value; // la canción
    this.next = null;   // apuntador al siguiente nodo
  }
}

class ListaCanciones {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.actual = null; // canción que suena ahora
  }

  agregar(cancion) {
    const nuevo = new Nodo(cancion);
    if (!this.head) {          // caso 1: lista vacía
      this.head = nuevo;
      this.tail = nuevo;
    } else {                   // caso 2: lista con nodos
      this.tail.next = nuevo;
      this.tail = nuevo;
    }
    this.size++;
  }

  siguiente() {
    this.actual = this.actual ? this.actual.next : this.head;
    return this.actual ? this.actual.value : null;
  }

  buscar(titulo) {
    let nodo = this.head;
    while (nodo !== null) {
      if (nodo.value.titulo === titulo) return nodo;
      nodo = nodo.next;
    }
    return null;
  }

  eliminar(titulo) {
    if (!this.head) return false;

    if (this.head.value.titulo === titulo) {      // eliminar cabeza
      if (this.actual === this.head) this.actual = this.head.next;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.size--;
      return true;
    }

    let anterior = this.head;
    while (anterior.next) {
      if (anterior.next.value.titulo === titulo) {
        const borrado = anterior.next;
        if (this.actual === borrado) this.actual = borrado.next;
        if (borrado === this.tail) this.tail = anterior; // eliminar cola
        anterior.next = borrado.next;                    // reconectar
        this.size--;
        return true;
      }
      anterior = anterior.next;
    }
    return false;
  }

  imprimir() {
    let nodo = this.head;
    while (nodo !== null) {
      console.log(`- ${nodo.value.titulo} (${nodo.value.artista})`);
      nodo = nodo.next;
    }
  }
}

// ---------- Prueba ----------
const lista = new ListaCanciones();
lista.agregar({ titulo: "Song A", artista: "Artista 1" });
lista.agregar({ titulo: "Song B", artista: "Artista 2" });
lista.agregar({ titulo: "Song C", artista: "Artista 3" });

console.log("Lista de reproducción:");
lista.imprimir();
console.log("Sonando:", lista.siguiente().titulo); // Song A
console.log("Sonando:", lista.siguiente().titulo); // Song B
console.log("Sonando:", lista.siguiente().titulo); // Song C
console.log("Siguiente tras la última:", lista.siguiente()); // null
lista.eliminar("Song C");
console.log("Tamaño tras eliminar Song C:", lista.size);     // 2
