import { Injectable } from '@angular/core';
import { InputBase } from './input-base';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Injectable()
export class InputService {

  constructor() { }

  toFormGroup(questions: InputBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });

    group['employeur'] = new FormControl('', Validators.required);
    group['fichePaye'] = new FormControl('', Validators.required);
    console.log('group', group)
    return new FormGroup(group);
  }

  toFormGroupPen(questions: InputBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });

    group['matriculTeravailleur'] = new FormControl('', Validators.required);
    group['matriculBenef'] = new FormControl('', Validators.required);
    return new FormGroup(group);
  }

  toFormGroupIJPf(questions: InputBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    group['observations'] = new FormControl('');
    console.log('group', group)
    return new FormGroup(group);
  }

  addControlToFormGroup(fg:FormGroup, questions:InputBase<any>[]){
    let group: any = {};
    questions.forEach(question => {
      fg.addControl(question.key, question.required ? new FormControl(question.value || '', Validators.required) 
      : new FormControl(question.value || ''));
    });
    return fg;
  }

  addControlToFormGroupPcs(fg:FormGroup, questions:InputBase<any>[]){
    let group: any = {};
    questions.forEach(question => {
      fg.addControl(question.key, question.required ? new FormArray(question.value || [], Validators.required) : new FormArray(question.value || []));
    });
    return fg;
  }
}
