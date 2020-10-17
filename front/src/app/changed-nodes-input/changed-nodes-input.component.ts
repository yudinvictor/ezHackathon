import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../shared/services/api.service';

@Component({
  selector: 'app-changed-nodes-input',
  templateUrl: './changed-nodes-input.component.html',
  styleUrls: ['./changed-nodes-input.component.scss']
})
export class ChangedNodesInputComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  maxNumberOfChanges = 100;

  form = new FormGroup(
    {
      'name 0': new FormControl(),
      'date_start 0': new FormControl(),
      'length 0': new FormControl(),
    }
  );


  numberOfChangesControl = new FormControl(1);
  numberOfChanges = 1;

  numbers = [0];

  editForm(oldLength, newLength) {
    if (newLength > oldLength) {
      for (let i = oldLength; i < newLength; ++i) {
        console.log(newLength);
        this.form.addControl(
          `name ${i}`,
          new FormControl(),
        );
        this.form.addControl(
          `date_start ${i}`,
          new FormControl(),
        );
        this.form.addControl(
          `length ${i}`,
          new FormControl(),
        );
      }
    } else {
      for (let i = oldLength - 1; i >= newLength; --i) {
        this.form.removeControl(`name ${i}`);
        this.form.removeControl(`date_start ${i}`);
        this.form.removeControl(`length ${i}`);
      }
    }
  }

  get possibleNumbersOfChanges() {
    const res = [];
    for (let i = 1; i <= this.maxNumberOfChanges; ++i) {
      res.push(i);
    }
    return res;
  }

  ngOnInit(): void {
    this.numberOfChangesControl.valueChanges.subscribe(
      value => {
        const valueInt = parseInt(value, 10);
        if (valueInt === null || valueInt < 1) {
          return;
        }
        this.editForm(this.numberOfChanges, valueInt);
        this.numberOfChanges = valueInt;
        this.setNumbers();
      }
    );
  }

  setNumbers() {
    const res = [];
    for (let i = 0; i < this.numberOfChanges; ++i) {
      res.push(i);
    }
    this.numbers = res;
  }

  submit() {
    const changes = [];
    for (let i = 0; i < this.numberOfChanges; ++i) {

      changes.push([
        this.form.get(`name ${i}`).value,
        this.form.get(`date_start ${i}`).value,
        this.form.get(`length ${i}`).value
      ]);
    }
    this.apiService.uploadChanges(changes).subscribe(
      value => {
        return null;
      }
    );
  }

}
