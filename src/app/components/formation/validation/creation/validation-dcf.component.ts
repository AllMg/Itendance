
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-demande-creation-formation',
  templateUrl: './validation-dcf.component.html',
  styleUrls: ['./validation-dcf.component.css']
})
export class ValidationDcfComponent implements OnInit {
  victime: any;
  employeurAdresse: any;
  constructor() { }

  ngOnInit() {
  }
  rejeter() {}
  pec() {}
}
