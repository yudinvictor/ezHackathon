import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Endpoints} from '../endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file) {
    const formData = new FormData();

    formData.append('file', file, file.name);
    return this.httpClient.post(Endpoints.uploadFile, formData);
  }
  change(changes) {
    return this.httpClient.post(Endpoints.change, changes);
  }
  getData() {
    return this.httpClient.get(Endpoints.getData);
  }
}
