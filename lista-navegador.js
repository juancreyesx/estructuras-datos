// Ejercicio 2: lista doblemente enlazada que simula un navegador web
class NodoPagina {
  constructor(nombre) {
    this.value = nombre;
    this.next = null; // página siguiente (adelante)
    this.prev = null; // página anterior (atrás)
  }
}

class Navegador {
  constructor() {
    this.head = null;
    this.tail = null;
    this.actual = null; // página en la que estamos
    this.size = 0;
  }

  agregarPagina(nombre) {
    const nuevo = new NodoPagina(nombre);
    if (!this.head) {
      this.head = nuevo;
      this.tail = nuevo;
      this.actual = nuevo;
    } else {
      nuevo.prev = this.tail;  // el nuevo apunta atrás a la cola
      this.tail.next = nuevo;  // la cola apunta adelante al nuevo
      this.tail = nuevo;
    }
    this.size++;
  }

  adelante() {
    if (this.actual && this.actual.next) this.actual = this.actual.next;
    else console.log("(No hay más páginas hacia adelante)");
  }

  atras() {
    if (this.actual && this.actual.prev) this.actual = this.actual.prev;
    else console.log("(No hay más páginas hacia atrás)");
  }

  // Imprime el recorrido desde Inicio hasta la página actual
  mostrarRuta() {
    const ruta = [];
    let nodo = this.head;
    while (nodo !== null) {
      ruta.push(nodo.value);
      if (nodo === this.actual) break;
      nodo = nodo.next;
    }
    console.log("Estás navegando en: " + ruta.join(" / "));
  }
}

// ---------- Prueba ----------
const nav = new Navegador();
nav.agregarPagina("Inicio");
nav.agregarPagina("Quiénes somos");
nav.agregarPagina("Contactos");

nav.mostrarRuta();   // Estás navegando en: Inicio
nav.adelante();
nav.mostrarRuta();   // Estás navegando en: Inicio / Quiénes somos
nav.adelante();
nav.mostrarRuta();   // Estás navegando en: Inicio / Quiénes somos / Contactos
nav.adelante();      // no hay más
nav.atras();
nav.mostrarRuta();   // Estás navegando en: Inicio / Quiénes somos
nav.atras();
nav.atras();         // no hay más
nav.mostrarRuta();   // Estás navegando en: Inicio
