import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {

  url = 'http://localhost:8000/';

  selectedFile: File = new File([], '');

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  loadFile() {
    console.log('loading');
  }

  onFileSelected(event: Event): void {
    console.log('event', event);
    this.selectedFile = (event.target as HTMLInputElement).files[0];
    console.log('name', this.selectedFile.name);
    this.apiService.uploadFile(this.selectedFile).subscribe(
      (value) => {
        console.log(value);
        this.openSnackBar('Файл успешно загружен', null);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  test() {
    this.http.get('http://127.0.0.1:8000/table/').subscribe(resp => {
      console.log(resp);
      // console.log(resp);
    });
  }
}
