import Edge from "./Edge";
import Vertex from "./Vertex";

/**
 * @author 1838304 - Alex Lajeunesse
 * 
 * @class Graph
 * 
 * @classdesc Graphe en français.
 * @classdesc Structure de données composée de noeuds et d'arêtes
 * @classdesc Sert à générer des régions dans cette application
 */
class Graph {

    /**
     * @author Alex Lajeunesse
     * 
     * @description Constructeur de Graph
     * 
     * @param color L'origine du graphe
     * @param end La fin du graphe
     * @returns null
     */
    constructor(origin, end) {
        this.vertices = [];
        this.edges = [];
        this.currentId = 0;
        this.grade = 0;

        this.origin = origin;
        this.end = end;
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Crée un noeud et l'ajoute au graphe
     * 
     * @param color la couleur qui lui sera assigné
     * @returns null
     */
    createVertex(color) {
        this.vertices.push(new Vertex(this.currentId, color));
        this.currentId++;
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Cherche dans le graphe le noeud recherché
     * 
     * @param id l'index du noeud qui est recherché
     * @returns le noeud s'il existe, sinon false
     */
    findVertex(id) {
        for (let index = 0; index < this.vertices.length; index++) {
            if (this.vertices[index].id === id) {
                return this.vertices[index];
            }
        }
        return false;
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Connecte deux noeuds ensemble en créant un arête.
     * 
     * @param from l'index du premier noeud
     * @param to l'index du second noeud
     * @returns null
     */
    connectVertices(from, to) {
        // Si les noeuds existent
        var vertex0 = this.findVertex(from);
        var vertex1 = this.findVertex(to);

        if (vertex0 !== false && vertex1 !== false) {
            this.createEdge(vertex0.id, vertex1.id);
        }
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Vérifie les noeuds connectés au noeud demandé
     * 
     * @param id L'identifiant du noeud
     * @returns Un tableau contenant les noeuds connectés
     */
    getConnectedVertices(id) {
        var connectedVertices = [];

        for (let i = 0; i < this.edges.length; i++) {
            if (this.edgeExist(id, i) || this.edgeExist(i, id)) {
                connectedVertices.push(i);
            }
        }
        return connectedVertices;
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Crée un arête reliant deux noeuds.
     * @description Vérifie si le lien existe déjà.
     * 
     * @param from l'index du premier noeud
     * @param to l'index du second noeud
     * @returns null
     */
    createEdge(from, to) {
        if (from > to) {
            var tmp = from;
            from = to;
            to = tmp;
        }
        if (this.edgeExist(from, to) === false && from !== to) {
            this.edges.push(new Edge(from, to));
        }
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Vérifie si un arête existe.
     * 
     * @param from l'index du premier noeud
     * @param to l'index du second noeud
     * @returns true si l'arête existe, sinon false
     */
    edgeExist(from, to) {
        for (let index = 0; index < this.edges.length; index++) {
            if (this.edges[index].from === from && this.edges[index].to === to) {
                return true;
            }
        }
        return false;
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Retourne le poids de l'arête demandé
     * 
     * @param {*} from l'index du premier noeud
     * @param {*} to l'index du second noeud
     * @returns le poids de l'arête s'il existe, sinon false
     */
    getEdgeWeight(from, to) {
        if (from > to) {
            var tmp = from;
            from = to;
            to = tmp;
        }
        for (let i = 0; i < this.edges.length; i++) {
            if (this.edges[i].from === from && this.edges[i].to === to) {
                return this.edges[i].weight;
            }
        }
        return false;
    }
}

export default Graph;