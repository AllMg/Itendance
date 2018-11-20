import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EmitterVisitorContext} from '@angular/compiler';
import {ToasterService} from 'angular2-toaster';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-table-poste',
  templateUrl: './table-poste.component.html',
  styleUrls: ['./table-poste.component.css']
})
export class TablePosteComponent implements OnInit {
  @Output() data = new EventEmitter();
  fieldArray: any[];
  newAttribute = {post: '' , qte: ''};
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.fieldArray = [];
  }
  deleteFieldValue(i: number) {
    this.fieldArray.splice(i, 1);
    this.data.emit(this.fieldArray);
  }
  addFieldValue() {
    let test = true;
    if (this.newAttribute.post === '') {
      this.toastr.error(' Veuillez remplir le post');
      test = false;
    }
    if  (this.newAttribute.qte === '' || +this.newAttribute.qte <= 0 ) {
      this.toastr.error(' Veuillez choisir une quantié supérieure à 0');
      test = false;
    }
    if (test === true) {
      this.fieldArray.push({libelle: this.newAttribute.post, nombre: this.newAttribute.qte});
      this.newAttribute = {post: '' , qte: ''};
      this.data.emit(this.fieldArray);
    }
  }
  changeField() {
    this.data.emit(this.fieldArray);
  }

}
