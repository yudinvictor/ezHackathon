import {Injectable} from '@angular/core';
import {Graph} from '../interfaces/graph-node';

class GraphNode {

}

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  graph: Graph = new Graph(
    [
      {
        name: 'name',
        plannedStart: 0,
        realStart: 0,
        plannedLength: 12,
        realLength: 13,
        children: [],
        isMilestone: false,
        nearMilestone: false,
        parents: [],
        penalty: 0,
      },
    ]
  );

  constructor() {
  }

  get changedNodes() {
    return this.graph.changedNodes;
  }
}
