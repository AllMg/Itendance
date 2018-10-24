import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { InputBase } from '../../services/ij/input-service/input-base';
import { InputService } from '../../services/ij/input-service/input.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demande-rappel-pen',
  templateUrl: './demande-rappel-pen.component.html',
  styleUrls: ['./demande-rappel-pen.component.css']
})
export class DemandeRappelPenComponent implements OnInit {
  public show: boolean;
  entity: string;
  user: any;
  referenceDemandeRap: string;
  dateAccouchement: string;
  dateNaissance: string;
  dateArret: string;
  salaireDernierMois: number;
  listEmployeur: any[];
  employeur: string;
  _demande: boolean = true;

  ijForm: FormGroup;
  @Input() inputs: InputBase<any>[] = [];

  constructor(
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private inputService: InputService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private routes: Router
  ) { 
    this.ijForm = this.fb.group({
      '49': ['', Validators.required],
      'employeur': ['', Validators.required],
      'fichePaye': ['', Validators.required]
    });
    this.show = false;
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this._demande = true;
  }
  
}
