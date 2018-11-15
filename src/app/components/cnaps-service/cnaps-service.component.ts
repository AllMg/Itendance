import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cnaps-service',
  templateUrl: './cnaps-service.component.html',
  styleUrls: ['./cnaps-service.component.css']
})
export class CnapsServiceComponent implements OnInit, AfterViewInit {
  connexion: any;
  private user: any;
  entity: string;

  constructor(
    private routes: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.entity = this.user.type_entite;
    }
  }
  ngAfterViewInit() {
    this.connexion = document.getElementById('connect');
  }
  //Lien employeur
  connexionPers() {
    this.connexion.click();
  }
}
