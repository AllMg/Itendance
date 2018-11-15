import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DynamicAtmpService} from '../../../../services/atmp/dynamic-atmp/dynamic-atmp.service';

@Component({
  selector: 'app-liste-fm',
  templateUrl: './liste-fm.component.html',
  styleUrls: ['./liste-fm.component.css']
})
export class ListeFmComponent implements OnInit {
  dats: any[];
  page = 1;
  size = 100;
  pageCount: any[];
  etat: number;
  typeChoose: number;
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
    if (this.user.type_entite !== 'S') {
      this.router.navigate(['']);
    }
    this.route.params.subscribe((params: Params) => {
      if (params['page']) {
        this.page = params['page'];
      }
      if (params['size']) {
        this.size = params['size'];
      }
      this.typeChoose = this.types[0].id_type_etat;
      this.atmpService.getDemandes(1, this.page, 212, this.size).subscribe(data => {
        console.log('finish 2');
        if (data.success) {
          this.dats = data.msg;
        } else {
          setTimeout(() => this.toastr.error(data.msg));
        }
      });
      this.atmpService.pageSize(1, this.page, 212, this.size).subscribe(data => {
        if (data.success) {
          this.pageCount = Array(+data.msg).map((x, i) => i);
        } else {
          setTimeout(() => this.toastr.error(data.msg));
        }
      });
    });
  }

  initData() {
    this.atmpService.getDemandes(1, this.page, 212, this.size).subscribe(data => {
      if (data.success) {
        this.dats = data.msg;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.atmpService.pageSize(1, this.page, 212, this.size).subscribe(data => {
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
