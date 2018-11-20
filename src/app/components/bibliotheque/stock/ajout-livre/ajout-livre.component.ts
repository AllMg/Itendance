import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-livre',
  templateUrl: './ajout-livre.component.html',
  styleUrls: ['./ajout-livre.component.css']
})
export class AjoutLivreComponent implements OnInit {
  fileNames: any[];
  service: string;
  constructor() { }

  ngOnInit() {
    this.fileNames = [{name: 'Image de couverture', multiple: 'false', type: 'image/*'}];
    this.service = 'Bibliothèque / stock';
  }

}
