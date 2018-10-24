import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Params} from '@angular/router';
import {DynamicAtmpService} from '../../services/atmp/dynamic-atmp/dynamic-atmp.service';

@Component({
  selector: 'app-liste-dat',
  templateUrl: './liste-dat.component.html',
  styleUrls: ['./liste-dat.component.css']
})
export class ListeDatComponent implements OnInit {
  dats: any[];
  page = 1;
  size = 100;
  pageCount: any[];
  etat: number;
  typeChoose: number;
  types: any[];
  constructor(
    private atmpService: DynamicAtmpService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['page']) {
        this.page = params['page'];
      }
      if (params['size']) {
          this.size = params['size'];
      }
      this.atmpService.type().subscribe( types => {
        if (types.success) {
          console.log('finish 1');
          this.types = types.msg;
          this.typeChoose = this.types[0].id_type_etat;
          this.atmpService.getDemandes(this.typeChoose, this.page, 229, this.size).subscribe( data => {
            console.log('finish 2');
            if (data.success) {
              this.dats = data.msg;
            } else {
              setTimeout(() => this.toastr.error(data.msg));
            }
          });
          this.atmpService.pageSize(this.typeChoose, this.page, 229, this.size).subscribe( data => {
            if (data.success) {
              console.log('finish 3');
              this.pageCount =  Array(+data.msg).map((x, i) => i) ;
            } else {
              setTimeout(() => this.toastr.error(data.msg));
            }
          });
        } else {
          setTimeout(() => this.toastr.error(types.msg));
        }
      });
    });
  }
  initData() {
    this.atmpService.getDemandes(this.typeChoose, this.page, 229, this.size).subscribe( data => {
      if (data.success) {
        this.dats = data.msg;
      } else {
        setTimeout(() => this.toastr.error(data.msg));
      }
    });
    this.atmpService.pageSize(this.typeChoose, this.page, 229, this.size).subscribe( data => {
      if (data.success) {
        this.pageCount =  Array(+data.msg).map((x, i) => i) ;
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
