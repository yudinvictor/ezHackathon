import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }
  uploadData(data) {
    return this.http.post(Endpoints.uploadData, data);
  }
  uploadChanges(changes) {
    return this.http.post(Endpoints.uploadChanges, {
      changes
    });
  }
}

