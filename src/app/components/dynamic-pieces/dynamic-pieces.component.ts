import { Component, OnInit, Input } from '@angular/core';
import { InputBase } from '../../services/ij/input-service/input-base';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { FileService } from '../../services/file/file.service';
import { FileModel } from '../../models/file-model';

@Component({
  selector: 'app-dynamic-pieces',
  templateUrl: './dynamic-pieces.component.html',
  styleUrls: ['./dynamic-pieces.component.css']
})
export class DynamicPiecesComponent implements OnInit {

  constructor(
    private fileService: FileService
  ) { }

  ngOnInit() {
  }

  @Input() pieces: InputBase<any>;
  @Input() form: FormGroup;
  @Input() idfiles: string;

  isValid() { return this.form.controls[this.pieces.key].valid; }
  onchange($event) {
    const files = $event.target.files;
    let formArray = <FormArray>this.form.controls[this.pieces.key.toString()];
    this.clearFormArray(formArray);
    for (let i = 0; i < files.length; i++) {
      this.push_and_convertBase64(files[i], formArray,this.pieces.label, this.idfiles);
      console.log("wawa")
    }
  }

  push_and_convertBase64(file: File, formArray:FormArray, key, idDmd) {
    const myReader: FileReader = new FileReader();
    myReader.readAsDataURL(file);
    myReader.onloadend = (err) => {
      let filemodel = new FileModel();
      filemodel.file = myReader.result;
      filemodel.name = key;
      filemodel.id_files = idDmd;
      formArray.push(new FormControl(filemodel));
    };
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
}
