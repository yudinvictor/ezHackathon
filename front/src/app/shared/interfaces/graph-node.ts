export interface GraphNode {
  children: number[];
  parents: number[];
  name: string;
  plannedStart: number;
  plannedLength: number;
  realStart: number;
  realLength: number;
  penalty: number;
  isMilestone: boolean;
  nearMilestone: boolean;
}


export class Graph {
  constructor(nodes: GraphNode[]) {
    this.nodes = nodes;
  }

  nodes: GraphNode[];

  get changedNodes(): GraphNode[] {
    return this.nodes.filter(value => value.plannedStart !== value.realStart || value.plannedLength !== value.realLength);
  }

}
