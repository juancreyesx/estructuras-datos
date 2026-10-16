// Ejercicio 9: trie (árbol de prefijos) para autocompletar palabras
// Cada nodo representa una letra; el camino desde la raíz forma una palabra.
// Las palabras que comparten el inicio comparten el camino ("casa" y "caso" comparten c-a-s).
class NodoTrie {
  constructor() {
    this.children = {};   // letra -> NodoTrie
    this.esFinal = false; // true si aquí termina una palabra completa
  }
}

class Trie {
  constructor() {
    this.root = new NodoTrie();
  }

  insertar(palabra) {
    let nodo = this.root;
    for (const letra of palabra.toLowerCase()) {
      if (!nodo.children[letra]) nodo.children[letra] = new NodoTrie();
      nodo = nodo.children[letra];
    }
    nodo.esFinal = true;
  }

  // Devuelve el nodo al que se llega siguiendo el prefijo, o null si no existe ese camino
  _buscarNodo(texto) {
    let nodo = this.root;
    for (const letra of texto.toLowerCase()) {
      nodo = nodo.children[letra];
      if (!nodo) return null;
    }
    return nodo;
  }

  // ¿La palabra completa está guardada?
  buscar(palabra) {
    const nodo = this._buscarNodo(palabra);
    return nodo !== null && nodo.esFinal;
  }

  // ¿Alguna palabra empieza con este prefijo?
  empiezaCon(prefijo) {
    return this._buscarNodo(prefijo) !== null;
  }

  // Autocompletar: baja hasta el prefijo y recoge todas las palabras de ese subárbol (DFS)
  autocompletar(prefijo) {
    const nodo = this._buscarNodo(prefijo);
    const resultados = [];
    if (nodo === null) return resultados;
    const recorrer = (actual, camino) => {
      if (actual.esFinal) resultados.push(camino);
      for (const letra of Object.keys(actual.children).sort()) {
        recorrer(actual.children[letra], camino + letra);
      }
    };
    recorrer(nodo, prefijo.toLowerCase());
    return resultados;
  }

  // Eliminar una palabra: quita la marca de final y poda las ramas que quedaron sin uso
  eliminar(palabra) {
    const letras = palabra.toLowerCase().split("");
    const eliminarRec = (nodo, i) => {
      if (i === letras.length) {
        if (!nodo.esFinal) return false;
        nodo.esFinal = false;
        return Object.keys(nodo.children).length === 0; // true = este nodo se puede podar
      }
      const hijo = nodo.children[letras[i]];
      if (!hijo) return false;
      const podar = eliminarRec(hijo, i + 1);
      if (podar) delete nodo.children[letras[i]];
      return !nodo.esFinal && Object.keys(nodo.children).length === 0;
    };
    return this.buscar(palabra) && (eliminarRec(this.root, 0), true);
  }
}

// ---- Demostración ----
const diccionario = new Trie();
["casa", "caso", "cama", "camino", "carro", "perro", "pera", "pez"].forEach((p) => diccionario.insertar(p));

console.log("¿Existe 'casa'?", diccionario.buscar("casa"));
console.log("¿Existe 'cas'?", diccionario.buscar("cas"), "(es solo un prefijo)");
console.log("¿Algo empieza con 'cam'?", diccionario.empiezaCon("cam"));
console.log("Autocompletar 'ca':", diccionario.autocompletar("ca"));
console.log("Autocompletar 'pe':", diccionario.autocompletar("pe"));
console.log("Autocompletar 'xyz':", diccionario.autocompletar("xyz"));
diccionario.eliminar("caso");
console.log("Tras eliminar 'caso', autocompletar 'cas':", diccionario.autocompletar("cas"));

if (typeof module !== "undefined") module.exports = { Trie };
