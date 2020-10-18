import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NodesService {
  optimizeOptions: any = {
    penalty: [[0, 0]],
    0: [[0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]]
  };
  changes = [];

  constructor(private apiService: ApiService) {
  }

  addChanges(id, start_date, duration, onDone = null) {
    const change = {
      id,
      start_date,
      duration,
    };
    this.changes.push(change);
    this.getGraph(change, onDone);
  }

  getGraph(change, onDone = null) {
    console.log(change);
    if (change == null) {
      this.apiService.getData().subscribe(value1 => {
        this.optimizeOptions = value1;
        onDone(value1);
      });
      return;
    }
    this.apiService.change(change).subscribe((value: any) => {
      console.log(value);
      this.apiService.getData().subscribe(value1 => {
        this.optimizeOptions = value1;
        onDone(value1);
      });
    });
  }
}

