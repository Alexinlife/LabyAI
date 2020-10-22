import React from 'react';
import Graph from 'react-graph-vis';
import MyGraph from './Graph';
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

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
        this.count = 0;

        // Pour parcoursEnLargeur() avec intervalle de temps
        this.poppedVertex = undefined;
        this.connectedVertices = undefined;
        this.stack.push(this.graph.origin);
        this.parcoursEnLargeur = this.parcoursEnLargeur.bind(this);
        this.intervalle = undefined;

        this.state = {
            graph: this.graph
        }

        this.createLaby();
    }

    componentDidMount() {
        this.intervalle = setInterval(() => this.parcoursEnLargeur(), 1000);
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

        this.setState((prevState) => ({
            graph: {
                ...prevState.graph,
                vertices: _.cloneDeep(this.graph.vertices),
                edges: _.cloneDeep(this.graph.edges),
            }
        }));
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
        this.graph.vertices[this.origin].color = "green";

        if (this.stack.length !== 0) {
            this.poppedVertex = this.stack.pop();
            this.connectedVertices = this.graph.getConnectedVertices(this.poppedVertex);

            for (let i = 0; i < this.connectedVertices.length; i++) {
                if (this.graph.vertices[this.connectedVertices[i]].color !== "green") {
                    this.stack.push(this.connectedVertices[i]);
                    this.graph.vertices[this.connectedVertices[i]].color = "green";
                    this.count++;
                }
                this.setState((prevState) => ({
                    graph: {
                        ...prevState.graph,
                        vertices: _.cloneDeep(this.graph.vertices),
                        edges: _.cloneDeep(this.graph.edges),
                    }
                }));
            }
        }
    }

    render() {
        // Gère les options du graphe tels que la physique l'identification des noeuds, etc.
        const options = {
            layout: {
                hierarchical: false,
                randomSeed: 4
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
                    key={uuidv4()}
                    graph={{
                        nodes: this.state.graph.vertices,
                        edges: this.state.graph.edges
                    }}
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