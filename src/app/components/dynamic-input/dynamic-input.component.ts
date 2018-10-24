import { Component, OnInit, Input } from '@angular/core';
import { InputBase } from '../../services/ij/input-service/input-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.css']
})
export class DynamicInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() input: InputBase<any>;
  @Input() form: FormGroup;
  isValid() { return this.form.controls[this.input.key].valid; }
}
