// Ejercicio 5: árbol binario de búsqueda (BST) con recorridos y búsqueda
class NodoBinario {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  isLeaf() {
    return this.left === null && this.right === null;
  }
}

class BST {
  constructor() {
    this.root = null; // solo importa dónde empieza
  }

  insertar(value) {
    const nuevo = new NodoBinario(value);
    if (!this.root) {
      this.root = nuevo;
      return;
    }
    let actual = this.root;
    while (true) {
      if (value === actual.value) return; // BST estricto: no duplicados
      if (value < actual.value) {
        if (!actual.left) { actual.left = nuevo; return; }
        actual = actual.left;
      } else {
        if (!actual.right) { actual.right = nuevo; return; }
        actual = actual.right;
      }
    }
  }

  // Búsqueda: descarta la mitad del árbol en cada paso
  buscar(value) {
    let actual = this.root;
    while (actual !== null) {
      if (value === actual.value) return actual;
      actual = value < actual.value ? actual.left : actual.right;
    }
    return null; // llegó a null: no existe
  }

  // Recorridos (recursivos, caso base: nodo null)
  preorden(nodo = this.root, res = []) {   // N, L, R
    if (nodo === null) return res;
    res.push(nodo.value);
    this.preorden(nodo.left, res);
    this.preorden(nodo.right, res);
    return res;
  }

  inorden(nodo = this.root, res = []) {    // L, N, R  (ascendente)
    if (nodo === null) return res;
    this.inorden(nodo.left, res);
    res.push(nodo.value);
    this.inorden(nodo.right, res);
    return res;
  }

  posorden(nodo = this.root, res = []) {   // L, R, N
    if (nodo === null) return res;
    this.posorden(nodo.left, res);
    this.posorden(nodo.right, res);
    res.push(nodo.value);
    return res;
  }
}

// ---------- Prueba (árbol del ejemplo de clase, raíz 25) ----------
const arbol = new BST();
[25, 15, 10, 12, 11, 22, 18, 50, 35, 44, 70, 66, 64, 90].forEach((n) => arbol.insertar(n));

console.log("Preorden :", arbol.preorden().join(", "));
console.log("Inorden  :", arbol.inorden().join(", "));
console.log("Posorden :", arbol.posorden().join(", "));

[44, 11, 99].forEach((n) => {
  const nodo = arbol.buscar(n);
  console.log(`Buscar ${n}:`, nodo ? "encontrado" + (nodo.isLeaf() ? " (es hoja)" : "") : "no existe en el árbol");
});
