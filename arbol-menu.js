// Ejercicio 6: árbol n-ario que simula un menú de navegación
class NodoMenu {
  constructor(titulo, enlace) {
    this.titulo = titulo;
    this.enlace = enlace;
    this.children = []; // submenús (puede estar vacía)
  }
  addChild(nodo) {
    this.children.push(nodo);
  }
}

// Recorrido en profundidad (DFS) con sangría según el nivel
function imprimirMenu(nodo, nivel = 0) {
  if (nodo === null) return;
  console.log(`${"   ".repeat(nivel)}${nivel > 0 ? "└─ " : ""}${nodo.titulo} (${nodo.enlace})`);
  for (const hijo of nodo.children) {
    imprimirMenu(hijo, nivel + 1);
  }
}

// ---------- Construcción del menú ----------
const menu = new NodoMenu("Menú principal", "/");

const inicio = new NodoMenu("Inicio", "/home");
const productos = new NodoMenu("Productos", "/productos");
const servicios = new NodoMenu("Servicios", "/servicios");
const contacto = new NodoMenu("Contacto", "/contacto");

const laptops = new NodoMenu("Laptops", "/productos/laptops");
const celulares = new NodoMenu("Celulares", "/productos/celulares");
productos.addChild(laptops);
productos.addChild(celulares);
laptops.addChild(new NodoMenu("Gamer", "/productos/laptops/gamer"));
laptops.addChild(new NodoMenu("Oficina", "/productos/laptops/oficina"));

servicios.addChild(new NodoMenu("Soporte técnico", "/servicios/soporte"));
servicios.addChild(new NodoMenu("Instalación", "/servicios/instalacion"));

menu.addChild(inicio);
menu.addChild(productos);
menu.addChild(servicios);
menu.addChild(contacto);

imprimirMenu(menu);
