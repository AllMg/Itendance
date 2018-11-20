import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  debut: Date;
  fin: Date;
  data: any[];
  constructor() { }

  ngOnInit() {
  }
  initData(param) {
    this.data = param;
  }

}
