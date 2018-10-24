import { Component, OnInit } from '@angular/core';
import { OpService} from '../../services/op/op.service';
import {IndividuService} from '../../services/individu/individu.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-reglement-op',
  templateUrl: './reglement-op.component.html',
  styleUrls: ['./reglement-op.component.css']
})
export class ReglementOpComponent implements OnInit {
  op_id = '';
  page: number;
  page_count: any[];
  constructor(
    private opservice: OpService,
    private individuservice: IndividuService,
    private route: ActivatedRoute,
    private toatr: ToastrService
  ) { }
  listOp: any [];

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['page']) {
        this.page = params['page'];
      } else {
        this.page = 1;
      }
      this.initData();
    });
    this.opservice.getCountPageFlag('O').subscribe( data => {
      if (data.success) {
        this.page_count = Array(+data.msg).map((x, i) => i);
      } else {
        alert(data.msg);
      }
    });
  }
  initData() {
    this.opservice.getListByFlag('O', this.page).subscribe( data => {
      if (data.success) {
        this.listOp = data.msg;
        for (let i = 0; i < this.listOp.length; i++) {
          if (this.listOp[i].tecbenef.length > 0) {
            if (this.listOp[i].tecbenef[0].id_individu !== '') {
              this.individuservice.infoIndiv(this.listOp[i].tecbenef[0].id_individu).subscribe( dataR => {
                if (dataR.success) {
                  this.listOp[i].tecbenef[0].individu = dataR.msg;
                } else {
                }
              });
            }
          }
        }
      } else {
        console.log(data.msg);
      }
    });
  }
  submitSearch() {
    if (this.op_id !== '') {
      this.opservice.getListByFlagById(this.op_id, 'O').subscribe( data => {
        if (data.success) {
          this.listOp = data.msg;
          for (let i = 0; i < this.listOp.length; i++) {
            if (this.listOp[i].tecbenef.length > 0) {
              if (this.listOp[i].tecbenef[0].id_individu !== '') {
                this.individuservice.infoIndiv(this.listOp[i].tecbenef[0].id_individu).subscribe( dataR => {
                  if (dataR.success) {
                    this.listOp[i].tecbenef[0].individu = dataR.msg;
                  } else {
                  }
                });
              }
            }
          }
        } else {
          console.log(data.msg);
        }
      });
    } else {
      this.initData();
    }
  }
  onKey(event: any) {
    this.op_id = event.target.value ;
  }
}
