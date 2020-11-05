import React from 'react';
import Graph from 'react-graph-vis';
import MyGraph from './Graph';
import PriorityQueue from 'priorityqueuejs';
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

/**
 * @author 1838304 - Alex Lajeunesse
 * 
 * @class Disjkstra
 * 
 * @classdesc Partie de l'algorithme qui parcoure les graphes pour trouver le plus court chemin.
 */
class Disjkstra extends React.Component {

    /**
     * @author Alex Lajeunesse
     * 
     * @description Constructeur de Disjkstra
     * 
     * @params null
     * @returns null
     */
    constructor() {
        super();
        this.queue = new PriorityQueue(function (a, b) {
            return b.distance - a.distance;
        });
        this.graph = new MyGraph(0, 15);
        this.origin = this.graph.origin;
        this.end = this.graph.end;
        this.count = 0;

        // TODO: Enlever lorsque terminé
        this.stack = [];

        // Pour disjkstra() avec intervalle de temps
        this.disjkstra = this.disjkstra.bind(this);
        this.intervalle = undefined;

        this.state = {
            graph: this.graph
        }

        this.createLaby();
        this.premierParcours();
    }

    componentDidMount() {
        this.intervalle = setInterval(() => this.disjkstra(), 500);
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

        // Positionnement des noeuds (oui, c'est laid)
        this.graph.vertices[0].x = 0;
        this.graph.vertices[0].y = 0;
        this.graph.vertices[1].x = 0;
        this.graph.vertices[1].y = 100;
        this.graph.vertices[2].x = 0;
        this.graph.vertices[2].y = 200;
        this.graph.vertices[3].x = 0;
        this.graph.vertices[3].y = 300;
        this.graph.vertices[4].x = 0;
        this.graph.vertices[4].y = 400;
        this.graph.vertices[5].x = 100;
        this.graph.vertices[5].y = 200;
        this.graph.vertices[6].x = 100;
        this.graph.vertices[6].y = 400;
        this.graph.vertices[7].x = 200;
        this.graph.vertices[7].y = 0;
        this.graph.vertices[8].x = 200;
        this.graph.vertices[8].y = 100;
        this.graph.vertices[9].x = 200;
        this.graph.vertices[9].y = 200;
        this.graph.vertices[10].x = 200;
        this.graph.vertices[10].y = 300;
        this.graph.vertices[11].x = 200;
        this.graph.vertices[11].y = 400;
        this.graph.vertices[12].x = 300;
        this.graph.vertices[12].y = 0;
        this.graph.vertices[13].x = 300;
        this.graph.vertices[13].y = 400;
        this.graph.vertices[14].x = 400;
        this.graph.vertices[14].y = 0;
        this.graph.vertices[15].x = 400;
        this.graph.vertices[15].y = 100;
        this.graph.vertices[16].x = 400;
        this.graph.vertices[16].y = 200;
        this.graph.vertices[17].x = 400;
        this.graph.vertices[17].y = 300;
        this.graph.vertices[18].x = 400;
        this.graph.vertices[18].y = 400;

        this.graph.vertices[this.origin].distance = 0;

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
     * @description Donne une valeur de distance à chaque noeud en effectuant un parcours en largeur
     * 
     * @params null
     * @returns null
     */
    premierParcours() {
        var na;
        var connectedVertices = [];

        this.graph.vertices[this.origin].color = "green";
        this.queue.enq(this.graph.vertices[this.origin]);

        while (!this.queue.isEmpty()) {
            na = this.queue.deq();
            connectedVertices = this.graph.getConnectedVertices(na.id);

            for (let i = 0; i < connectedVertices.length; i++) {
                if (this.graph.vertices[connectedVertices[i]].color !== "green") {
                    this.queue.enq(this.graph.vertices[connectedVertices[i]]);
                    this.graph.vertices[connectedVertices[i]].color = "green";
                    this.graph.vertices[connectedVertices[i]].distance = na.distance + this.graph.getEdgeWeight(na.id, connectedVertices[i]);
                }
            }
        }

        this.resetColors();
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description Réinitialise les couleurs après premierParcours()
     * @description premierParcours() marque les noeuds en vert
     */
    resetColors() {
        for (let i = 0; i < this.graph.vertices.length; i++) {
            this.graph.vertices[i].color = "white";
        }
        this.graph.vertices[this.origin].color = "blue";
        this.graph.vertices[this.end].color = "red";
    }

    /**
     * @author Alex Lajeunesse
     * 
     * @description 
     * 
     * @params null
     * @returns null
     */
    disjkstra() {
        this.graph.vertices[this.origin].color = "green";

        if (this.stack.length !== 0) {
            this.poppedVertex = this.stack.shift();
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
            height: "600px"
        };

        return (
            <div className="content">
                <h4 className="title">Algorithme de Disjkstra</h4>
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

export default Disjkstra;