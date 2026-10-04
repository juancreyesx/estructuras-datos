// Ejercicio 7: grafo de personas y ciudades (lista de adyacencia)
class Graph {
  constructor() {
    this.nodes = {};      // id -> datos del nodo (persona o ciudad)
    this.adjacency = {};  // id -> arreglo de ids conectados
  }

  findNode(id) {
    return Object.prototype.hasOwnProperty.call(this.nodes, id);
  }

  // Valida duplicados: si ya existe, no lo agrega (así no se pierden sus conexiones)
  addNode(id, datos) {
    if (this.findNode(id)) {
      console.log(`(El nodo "${id}" ya existe, no se agrega de nuevo)`);
      return;
    }
    this.nodes[id] = datos;
    this.adjacency[id] = [];
  }

  // Grafo no dirigido: la conexión va en ambos sentidos
  addEdge(id1, id2) {
    if (!this.findNode(id1) || !this.findNode(id2)) {
      console.log("(No se puede conectar: falta un nodo)");
      return;
    }
    this.adjacency[id1].push(id2);
    this.adjacency[id2].push(id1);
  }

  getNeighbors(id) {
    return this.adjacency[id] || [];
  }

  printGraph() {
    for (const id in this.adjacency) {
      console.log(`${id} -> ${this.adjacency[id].join(", ")}`);
    }
  }
}

// ---------- Prueba ----------
const grafo = new Graph();

// Ciudades (nodos con nombre)
grafo.addNode("Cali", { tipo: "ciudad", nombre: "Cali" });
grafo.addNode("Bogotá", { tipo: "ciudad", nombre: "Bogotá" });
grafo.addNode("Medellín", { tipo: "ciudad", nombre: "Medellín" });

// Personas (nodos con nombre y edad)
grafo.addNode("Ana", { tipo: "persona", nombre: "Ana", edad: 22 });
grafo.addNode("Luis", { tipo: "persona", nombre: "Luis", edad: 30 });
grafo.addNode("Marta", { tipo: "persona", nombre: "Marta", edad: 27 });
grafo.addNode("Pedro", { tipo: "persona", nombre: "Pedro", edad: 35 });
grafo.addNode("Ana", { tipo: "persona", nombre: "Ana", edad: 22 }); // duplicado: se ignora

// Cada persona pertenece a una sola ciudad
grafo.addEdge("Ana", "Cali");
grafo.addEdge("Luis", "Cali");
grafo.addEdge("Marta", "Bogotá");
grafo.addEdge("Pedro", "Medellín");

console.log("\nGrafo completo:");
grafo.printGraph();

// Personas que viven en una ciudad
function personasDeCiudad(g, ciudad) {
  console.log(`\nPersonas que viven en ${ciudad}:`);
  g.getNeighbors(ciudad)
    .map((id) => g.nodes[id])
    .filter((n) => n.tipo === "persona")
    .forEach((p) => console.log(`- ${p.nombre} (${p.edad} años)`));
}

personasDeCiudad(grafo, "Cali");
personasDeCiudad(grafo, "Bogotá");
