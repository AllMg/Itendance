import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DynamicAtmpService} from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';

declare let $: any;

@Component({
  selector: 'app-prothese',
  templateUrl: './prothese.component.html',
  styleUrls: ['./prothese.component.css']
})
export class ProtheseComponent implements OnInit {
  itemProthese = [];
  @Output() valchange = new EventEmitter();
  fieldArray: Array<any> = [];
  newAttribute: any = {};

  constructor(private dynamicATMP: DynamicAtmpService) {
  }

  ngOnInit() {
  }

  addrows() {
    $('.test').find('tr:last').clone().appendTo($('table'));
  }

  delrows(event) {
    console.log(event.target);
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.valchange.emit(this.fieldArray);
    console.log(this.fieldArray);

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.valchange.emit(this.fieldArray);
  }
  public inputTypedFiraisana(source: string, text: string) {
    if (text.length >= 3) {
      this.dynamicATMP.findProthese(text).subscribe(data => {
        this.initDataFiraisana(data.msg);
      });
    }
  }
  private initDataFiraisana(data: any[]) {
    this.itemProthese = [];
    for (let i = 0; i < data.length; i++) {
      this.itemProthese.push({id: data[i], text: data[i].libelle});
    }
  }
}
