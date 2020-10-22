import React from 'react';
import Graph from 'react-graph-vis';
import MyGraph from './Graph';

/**
 * @author 1838304 - Alex Lajeunesse
 * 
 * @class Traversal
 * 
 * @classdesc Parcours en français.
 * @classdesc Partie de l'algorithme qui parcoure les graphes.
 */
class Traversal extends React.Component {

    /**
     * @author Alex Lajeunesse
     * 
     * @description Constructeur de Traversal
     * 
     * @params null
     * @returns null
     */
    constructor() {
        super();
        this.stack = [];
        this.graph = new MyGraph(0, 15);
        this.origin = this.graph.origin;
        this.end = this.graph.end;

        this.state = {
            graph: undefined
        }

        this.createLaby();
        this.parcoursEnLargeur();
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Crée le labyrinthe tel qu'indiqué dans le Google Drawings fourni
     * 
     * @params null
     * @returns null
     */
    createLaby() {
        // Création des noeuds
        for (let i = 0; i < 19; i++) {
            this.graph.createVertex(0);
            this.graph.vertices[i].color = "white";
        }
        // Marquage des noeuds de début et de fin
        this.graph.vertices[this.origin].color = "blue";
        this.graph.vertices[this.end].color = "red";

        // Création des edges
        this.graph.connectVertices(this.origin, 1);
        this.graph.connectVertices(1, 2);
        this.graph.connectVertices(2, 3);
        this.graph.connectVertices(3, 4);
        this.graph.connectVertices(2, 5);
        this.graph.connectVertices(4, 6);
        this.graph.connectVertices(5, 9);
        this.graph.connectVertices(6, 11);
        this.graph.connectVertices(7, 8);
        this.graph.connectVertices(8, 9);
        this.graph.connectVertices(9, 10);
        this.graph.connectVertices(10, 11);
        this.graph.connectVertices(7, 12);
        this.graph.connectVertices(11, 13);
        this.graph.connectVertices(12, 14);
        this.graph.connectVertices(13, 18);
        this.graph.connectVertices(14, 15);
        this.graph.connectVertices(15, 16);
        this.graph.connectVertices(16, 17);
        this.graph.connectVertices(17, 18);

        this.setState({
            graph: this.graph
        });

        console.log(this.graph.getConnectedVertices(14));
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description L’algorithme de parcours en largeur permet de visiter tous les noeuds d’un graphe
     * @description en commençant par le noeud racine pour visiter tous les noeuds voisins puis leurs successeurs,
     * @description et ainsi de suite jusqu’à ce que l’on ait parcouru tout le graphe. (Description fournie par Frédérik Taleb)
     * 
     * @params null
     * @returns null
     */
    parcoursEnLargeur() {
        var poppedVertex;
        var connectedVertices;
        this.stack.push(this.graph.origin);
        this.graph.vertices[this.origin].color = "green";

        while (this.stack.length !== 0) {
            poppedVertex = this.stack.pop();
            connectedVertices = this.graph.getConnectedVertices(poppedVertex);

            for (let i = 0; i < connectedVertices.length; i++) {
                if (this.graph.vertices[i].color !== "green") {
                    this.stack.push(connectedVertices[i]);
                    this.graph.vertices[i].color = "green";
                }
                this.setState({
                    graph: this.graph
                });
                console.log(this.state.graph);
            }
        }
    }

    render() {
        const graph = {
            nodes: this.graph.vertices,
            edges: this.graph.edges
        };

        // Gère les options du graphe tels que la physique l'identification des noeuds, etc.
        const options = {
            layout: {
                hierarchical: false
            },
            nodes: {
                shape: "dot",
                font: {
                    color: "#000000",
                    vadjust: -40
                },
            },
            edges: {
                color: "#000000",
                arrows: {
                    to: false
                }
            },
            physics: {
                enabled: false
            },
            height: "700px"
        };

        return (
            <div className="content">
                <Graph
                    graph={graph}
                    options={options}
                    getNetwork={(network) => {
                        //  if you want access to vis.js network api you can set the state in a parent component using this property
                    }}
                />
            </div>
        );
    }
}

export default Traversal;