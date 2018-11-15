import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {DynamicAtmpService} from '../../../services/atmp/dynamic-atmp/dynamic-atmp.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sous-demande',
  templateUrl: './sous-demande.component.html',
  styleUrls: ['./sous-demande.component.css']
})
export class SousDemandeComponent implements OnInit {
  reference: string;
  showLink: boolean;
  constructor(
      private route: ActivatedRoute,
      private atmpService: DynamicAtmpService,
      private toatr: ToastrService
  ) {
    this.showLink = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.reference = params['id'];
        this.inputTyped('', this.reference);
      } else {
        this.showLink = false;
      }
    });
  }
  inputTyped(source: string, text: string) {
    console.log(text);
    if (text.length >= 14) {
      console.log('ici');
      this.atmpService.exist(text).subscribe(data => {
        if (data.success) {
          if (data.msg.exist) {
            this.showLink = true;
            this.reference = text;
          } else {
            this.showLink = false;
            this.toatr.error('le matricule que vous avez inséré n\'existe pas');
          }
        } else {
          this.toatr.error(data.msg);
        }
      });
    }
  }

}
