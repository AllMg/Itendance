import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {CalendarDataModel} from '../../../models/CalendarDataModel';

@Component({
  selector: 'app-emploie-temp',
  templateUrl: './emploie-temp.component.html',
  styleUrls: ['./emploie-temp.component.css']
})
export class EmploieTempComponent implements OnInit, OnChanges {
  @Input() debut: Date;
  @Input() fin: Date;
  @Output() result = new EventEmitter();

  fieldArray: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.debut) {
      const debut: SimpleChange = changes.debut;
      this.debut = new Date(debut.currentValue);
    }
    if (changes.fin) {
      const fin: SimpleChange = changes.fin;
      this.fin = new Date(fin.currentValue);
    }
    this.getDates();
  }
  getDates() {
    this.fieldArray = [];
    const interval = 1;
    const current = new Date(this.debut);

    while (current <= this.fin) {
      this.fieldArray.push({date: this.formatDate(current) , debut: '', fin: ''});
      current.setDate(current.getDate() + interval);
    }
    this.getValue();
  }
  formatDate(date) {
    const d = new Date(date);
     let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
     const year = d.getFullYear();

    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }
  getValue() {
    const result = [];
    const sizeArray = this.fieldArray.length;
    for (let i = 0; i < sizeArray; i++) {
      const modelData = new CalendarDataModel();
      modelData.title = this.fieldArray[i].date;
      if (this.fieldArray[i].debut !== '') {
        modelData.start = this.fieldArray[i].date + ' ' + this.fieldArray[i].debut;
      }
      if (this.fieldArray[i].fin !== 'fin') {
        modelData.end = this.fieldArray[i].date + ' ' + this.fieldArray[i].fin;
      }
      result.push(modelData);
    }
    this.result.emit(result);
  }

}
