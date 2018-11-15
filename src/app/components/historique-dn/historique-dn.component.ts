import { Component, OnInit } from '@angular/core';
import {DnService} from '../../services/dn/dn.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historique-dn',
  templateUrl: './historique-dn.component.html',
  styleUrls: ['./historique-dn.component.css']
})
export class HistoriqueDnComponent implements OnInit {
  histo: any[];
  user: any;

  constructor(
    private dnService: DnService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.histo = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.dnService.getHistoriqueDn(this.user.id_acces, 50, 1).subscribe(data=>{
      console.log(data);
      if(data.success){
        let statut = '';
        for (let index = 0; index < data.msg.length; index++) {
          if(data.msg[index][2]===null) statut = 'Non déclaré';
          if(data.msg[index][2]!==null) statut = 'Déclaré';
          if(data.msg[index][3]!==null) statut = 'Validé';
          this.histo.push({
            periode: data.msg[index][0],
            cotisation: data.msg[index][1],
            dateDeclaration : data.msg[index][2],
            dateValidation : data.msg[index][3],
            statut: statut
          });
        }
      }
      else{
        this.histo = [];
        setTimeout( () => this.toastr.error(data.msg));
      }
    });
  }
  link(periode){
    location.reload();
    this.router.navigate(['/dn/'+periode]);
  }
}
