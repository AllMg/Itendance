import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';

@Component({
  selector: 'app-liste-fp-atmp',
  templateUrl: './liste-fp-atmp.component.html',
  styleUrls: ['./liste-fp-atmp.component.css']
})
export class ListeFpAtmpComponent implements OnInit {
  dats: any[];
  page = 1;
  size = 100;
  pageCount: any[];
  etat: number;
  types: any[];
  user: any;

  constructor(
    private atmpService: DynamicAtmpService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.type_entite === 'T' || this.user.type_entite === 'E' ||
      this.user.type_entite === undefined || this.user.type_entite === 'C' || this.user.type_entite === 'S') {
      this.router.navigate(['']);
    }
    this.route.params.subscribe((params: Params) => {
      if (params['page']) {
        this.page = params['page'];
      }
      if (params['size']) {
        this.size = params['size'];
      }
      this.atmpService.getDemandes(12, this.page, 213, this.size).subscribe(data => {
        console.log('finish 2');
        if (data.success) {
          console.log(data);
          this.dats = data.msg;
        } else {
          setTimeout(() => this.toastr.error(data.msg));
        }
      });
      this.atmpService.pageSize(12, this.page, 213, this.size).subscribe(data => {
        if (data.success) {
          this.pageCount = Array(+data.msg).map((x, i) => i);
        } else {
          setTimeout(() => this.toastr.error(data.msg));
        }
      });
    });
  }

  initData() {
    this.atmpService.getDemandes(12, this.page, 213, this.size).subscribe(data => {
      if (data.success) {
        this.dats = data.msg;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.atmpService.pageSize(12, this.page, 213, this.size).subscribe(data => {
      if (data.success) {
        this.pageCount = Array(+data.msg).map((x, i) => i);
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });

  }

  changeType($event) {
    this.dats = [];
    this.initData();
  }

}
