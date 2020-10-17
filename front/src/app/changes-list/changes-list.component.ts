import {Component, OnInit} from '@angular/core';
import {GraphDataService} from '../shared/services/graph-data.service';
import {GraphNode} from '../shared/interfaces/graph-node';

@Component({
  selector: 'app-changes-list',
  templateUrl: './changes-list.component.html',
  styleUrls: ['./changes-list.component.scss']
})
export class ChangesListComponent implements OnInit {

  displayedColumns = ['name', 'plannedStart', 'realStart', 'plannedLength', 'realLength', 'penalty'];

  constructor(private graphData: GraphDataService) {
  }

  ngOnInit(): void {
  }

  get changedNodes(): GraphNode[] {
    return this.graphData.changedNodes;
  }

}
