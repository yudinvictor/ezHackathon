import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {

  url = 'http://localhost:8000/';

  selectedFile: File = new File([], '');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  loadFile() {
    console.log('loading');
  }

  onFileSelected(event: Event): void {
    console.log('event', event);
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    console.log('name', this.selectedFile.name);


    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    const url = this.url;
    this.http.post(url, fd).subscribe(resp => {
      console.log(resp);
    })
  }
}
