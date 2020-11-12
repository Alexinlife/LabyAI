/**
 * @author 1838304 - Alex Lajeunesse
 * 
 * @class Vertex
 * 
 * @classdesc Noeud en français. Composant du graphe contenant des données.
 * @classdesc Est lié à d'autres noeuds avec des arêtes.
 * @classdesc Sert à définir les zones et leur couleur dans cette application.
 */
class Vertex {
    
    /**
     * @author Alex Lajeunesse
     * 
     * @description Constructeur de Vertex
     * 
     * @param id L'identifiant du noeud
     * @param color Le groupe du noeud
     * @returns null
     */
    constructor(id, color) {
        this.id = id;
        this.x = null;
        this.y = null;
        this.distance = 1000000000;
        this.label = String(id);
        this.color = color;
    }
}

export default Vertex;