// Challenge 11: buscador inteligente de productos + Top resultados
// - Los productos se guardan en un Trie (búsqueda por prefijo)
// - Un Heap mínimo devuelve los K más populares

// ---------- Heap mínimo (por popularidad), representado con un arreglo ----------
class MinHeap {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  peek() {
    return this.items.length === 0 ? null : this.items[0];
  }

  toArray() {
    return [...this.items];
  }

  swap(i, j) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }

  // push: inserta al final y lo sube hasta que se cumpla la propiedad del heap
  push(producto) {
    this.items.push(producto);
    this.percolateUp(this.items.length - 1);
  }

  // pop: quita y devuelve el mínimo (la raíz)
  pop() {
    if (this.items.length === 0) return null;
    const minimo = this.items[0];
    const ultimo = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = ultimo;
      this.percolateDown(0);
    }
    return minimo;
  }

  // percolateUp: sube mientras sea menor que su padre
  percolateUp(i) {
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.items[i].popularity < this.items[padre].popularity) {
        this.swap(i, padre);
        i = padre;
      } else {
        break;
      }
    }
  }

  // percolateDown: baja mientras sea mayor que alguno de sus hijos
  percolateDown(i) {
    const n = this.items.length;
    while (true) {
      const izq = 2 * i + 1;
      const der = 2 * i + 2;
      let menor = i;
      if (izq < n && this.items[izq].popularity < this.items[menor].popularity) menor = izq;
      if (der < n && this.items[der].popularity < this.items[menor].popularity) menor = der;
      if (menor === i) break;
      this.swap(i, menor);
      i = menor;
    }
  }

  // heapify: convierte un arreglo en heap
  heapify(arreglo) {
    this.items = [...arreglo];
    for (let i = Math.floor(this.items.length / 2) - 1; i >= 0; i--) {
      this.percolateDown(i);
    }
  }
}

// ---------- Trie ----------
class NodoTrie {
  constructor() {
    this.children = {};      // letra -> NodoTrie
    this.isEndOfWord = false;
    this.producto = null;    // { name, popularity } si aquí termina un producto
  }
}

class Trie {
  constructor() {
    this.root = new NodoTrie(); // la raíz no representa ninguna letra
  }

  // insert: un nodo por letra; el último queda marcado como fin de palabra
  insert(name, popularity) {
    let nodo = this.root;
    for (const letra of name.toLowerCase()) {
      if (!nodo.children[letra]) nodo.children[letra] = new NodoTrie();
      nodo = nodo.children[letra];
    }
    nodo.isEndOfWord = true;
    nodo.producto = { name, popularity };
  }

  // search: true si la palabra completa existe
  search(name) {
    const nodo = this._nodoDe(name);
    return nodo !== null && nodo.isEndOfWord;
  }

  _nodoDe(texto) {
    let nodo = this.root;
    for (const letra of texto.toLowerCase()) {
      if (!nodo.children[letra]) return null;
      nodo = nodo.children[letra];
    }
    return nodo;
  }

  // Recorre el subárbol y junta todos los productos que empiezan con el prefijo
  _productosDesde(nodo, lista) {
    if (nodo.isEndOfWord) lista.push(nodo.producto);
    for (const letra of Object.keys(nodo.children)) {
      this._productosDesde(nodo.children[letra], lista);
    }
    return lista;
  }

  searchByPrefix(prefijo) {
    const nodo = this._nodoDe(prefijo);
    return nodo === null ? [] : this._productosDesde(nodo, []);
  }

  // searchTopK: busca por prefijo y usa un heap mínimo de tamaño K.
  // Si el heap supera K elementos, se saca el menos popular; al final quedan los K mejores.
  searchTopK(prefijo, k) {
    const heap = new MinHeap();
    for (const producto of this.searchByPrefix(prefijo)) {
      heap.push(producto);
      if (heap.size() > k) heap.pop();
    }
    return heap.toArray().sort((a, b) => b.popularity - a.popularity);
  }
}

// ---------- Demostración ----------
const buscador = new Trie();
buscador.insert("air max", 90);
buscador.insert("air force", 95);
buscador.insert("air jordan", 85);
buscador.insert("adidas boost", 80);

console.log('searchTopK("air", 2):');
console.log(buscador.searchTopK("air", 2));
// [ { name: 'air force', popularity: 95 }, { name: 'air max', popularity: 90 } ]

console.log('searchTopK("a", 3):');
console.log(buscador.searchTopK("a", 3));

console.log('searchTopK("nike", 2):', buscador.searchTopK("nike", 2));
console.log('search("air max"):', buscador.search("air max"));
console.log('search("air"):', buscador.search("air"));

module.exports = { MinHeap, Trie };
