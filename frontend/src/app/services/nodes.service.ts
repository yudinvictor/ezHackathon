import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  optimizeOptions: any = {penalty: [[0, 0]], 0: [[0, 0, 0, 0, 0, 0, 0]]};
  changes = [];

  constructor(private apiService: ApiService) {
  }

  addChanges(id, start_date, duration) {
    const change = {
      id,
      start_date,
      duration,
    };
    this.changes.push(change);
    this.getGraph(change);
  }

  getGraph(change) {
    this.apiService.getGraph(change).subscribe((value: any) => {
      console.log(value);
      this.optimizeOptions = value;
    });
  }
}

