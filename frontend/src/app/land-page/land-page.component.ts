import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss']
})
export class LandPageComponent implements OnInit {

  url = 'http://localhost:8000/upload/';

  selectedFile: File = new File([], '');

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {
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
      (value: any) => {
        if (value.ok) {
          this.openSnackBar('Файл успешно загружен', null);
          setTimeout(() => this.router.navigate(['/plan']), 2100);
        } else {
          this.openSnackBar('Что-то пошло не так(', null);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  test() {
    this.http.get('http://127.0.0.1:8000/result/').subscribe(resp => {
      console.log(resp['penalty']);
      // console.log(resp);
      // console.log(resp);
    });
  }
}
