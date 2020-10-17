import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-nodes-list-input',
  templateUrl: './nodes-list-input.component.html',
  styleUrls: ['./nodes-list-input.component.scss']
})
export class NodesListInputComponent implements OnInit {
  form = new FormGroup({
      numberOfNodes: new FormControl('', [Validators.required, Validators.min(0)]),
      password: new FormControl('', [Validators.required])
    }
  );

  loginError = false;

  ngOnInit(): void {
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  submit() {
  }

}
