import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FileModel} from '../../../models/file-model';
import {fileExists} from 'ts-node';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit, OnChanges {
  @Output() valide = new EventEmitter();
  @Output() filesBase64 = new EventEmitter();
  @Input() filesName: any[];
  @Input() id_demande: string;
  @Input() service: string;
  pieceValue: any[];
  constructor(
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {

    this.initPieceValue();
    this.emitValue();
  }
  onFileChange($event, indice: number) {
    this.readThis($event.target, indice);
    this.emitValue();
  }
  initPieceValue() {
    this.pieceValue = new Array<Array<any>>();
    const size = this.filesName.length;
    for (let i = 0; i < size; i++) {
      this.pieceValue.push(new Array<any>());
    }
  }
  readThis(inputValue: any, indice: number): void {
    const row = [];
    for ( let i = 0; i < inputValue.files.length ; i++) {
      const file: File = inputValue.files[i];
      const myReader: FileReader = new FileReader();
      myReader.readAsDataURL(file);
      this.pieceValue[indice] = [];
      const temp = new FileModel();
      myReader.onloadend = (e) => {
        temp.id_files = this.id_demande;
        temp.file = myReader.result;
        temp.serviceName = this.service;
        temp.name = this.filesName[indice].name;
      };
      row.push(temp);
    }
    this.pieceValue[indice] = row;

  }
  filesIsValide(): boolean {
    let result = true;
    for (let i = 0; i < this.pieceValue.length; i++) {
      if (this.pieceValue[i].length === 0 ) {
        result = false;
        break;
      }
    }
    return result;

  }
  emitValue() {
    const valide = this.filesIsValide();
    this.valide.emit(valide);
    this.filesBase64.emit(this.pieceValue);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.filesName) {
      this.filesName = changes.filesName.currentValue;
      const size = this.filesName.length;
      this.initPieceValue();
      this.valide.emit(this.filesIsValide());
    }
    if (changes.id_demande) {
      this.id_demande = changes.id_demande.currentValue;
      const size = this.pieceValue.length;
      for (let i = 0; i < size; i++) {
        const size2D = this.pieceValue[i].length;
        for (let j = 0 ; j < size2D; j++) {
          this.pieceValue[i][j].id_files = '' + this.id_demande;
        }
      }
    }
    this.emitValue();
  }
}
