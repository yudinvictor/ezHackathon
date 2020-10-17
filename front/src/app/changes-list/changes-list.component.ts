import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GraphDataService} from '../shared/services/graph-data.service';
import {GraphNode} from '../shared/interfaces/graph-node';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-changes-list',
  templateUrl: './changes-list.component.html',
  styleUrls: ['./changes-list.component.scss']
})
export class ChangesListComponent implements OnInit, AfterViewInit {

  changedNodes: MatTableDataSource<GraphNode>;

  constructor(private graphData: GraphDataService) {
  }

  displayedColumns = ['name', 'plannedStart', 'realStart', 'plannedLength', 'realLength', 'penalty'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.changedNodes = new MatTableDataSource<GraphNode>(this.graphData.changedNodes.sort((a, b) => {
        if (a.isCondition !== b.isCondition) {
          return a.isCondition ? 1 : -1;
        }
        return a.penalty > b.penalty ? 1 : a.penalty === b.penalty ? 1 : 0;
      }
    ));
  }

  ngAfterViewInit() {
    this.changedNodes.paginator = this.paginator;
  }


}
