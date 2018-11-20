import { Component, OnInit, EventEmitter, Output } from '@angular/core';
declare let $: any;
@Component({
  selector: 'app-ordo',
  templateUrl: './ordo.component.html',
  styleUrls: ['./ordo.component.css']
})
export class OrdoComponent implements OnInit {
  @Output() valchange = new EventEmitter();
  fieldArray: Array<any> = [];
  newAttribute: any = {};

  constructor() { }

  ngOnInit() {
  }
  addrows() {
    $('.test').find('tr:last').clone().appendTo($('table'));
  }
  delrows(event) {
    console.log(event.target);
  }

  addFieldValue() {
    this.newAttribute.id_ref_ord_det = null;
    this.newAttribute.id_ref_rfa_ord = null;
    this.newAttribute.valide = false;
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    this.valchange.emit(this.fieldArray);
    console.log(this.fieldArray);

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    this.valchange.emit(this.fieldArray);
  }
}
