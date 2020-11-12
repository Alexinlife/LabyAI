/**
 * @author 1838304 - Alex Lajeunesse
 * 
 * @class Edge
 * 
 * @classdesc Arête en français. Composant du graphe.
 * @classdesc Relie deux noeuds entre eux.
 */
class Edge {

    /**
     * @author Alex Lajeunesse
     * 
     * @description Constructeur de Edge
     * 
     * @param idFrom L'id du premier noeud
     * @param idTo L'id du second noeud
     * @returns null
     */
    constructor(idFrom, idTo) {
        this.from = idFrom;
        this.to = idTo;
        this.weight = 1;
        this.label = String(this.weight);
    }
}

export default Edge;