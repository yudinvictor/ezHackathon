import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  optimizeOptions: any = [[0, 0, [[0, 0, 0, 0, 0, 0, 0]]], [0, 0, [[0, 0, 0, 0, 0, 0, 1]]]];
  changes = [];

  constructor(private apiService: ApiService) {
  }

  addChanges(id, start_date, duration) {
    this.changes.push({
      id,
      start_date,
      duration,
    });
    this.getGraph();
  }

  getGraph() {
    this.apiService.getGraph(this.changes).subscribe((value: any) => {
      this.optimizeOptions = value;
    });
  }
}

