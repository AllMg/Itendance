import { Component, OnInit } from '@angular/core';
import { IndividuService } from '../../services/individu/individu.service';
import { InfoService } from '../../services/info/info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historique-droit',
  templateUrl: './historique-droit.component.html',
  styleUrls: ['./historique-droit.component.css']
})
export class HistoriqueDroitComponent implements OnInit {

  private user: any;
  dataOrdLiquide: any;
  individu: any;
  prestation: any;
  constructor(private indiService: IndividuService, private infoService: InfoService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.getListOrdLiquide(this.route.snapshot.params['id']);
    this.infoService.infoIndiv(this.user.id_acces).subscribe(
      (infoIndividu) => {
        this.individu = infoIndividu.msg;
        console.log(infoIndividu);
      }
    );
  }

  getListOrdLiquide(id) {
    this.indiService.detailsListOrdLiquide(id).subscribe(
      (dataRes) => {
        this.dataOrdLiquide = dataRes.msg;

        this.indiService.detailsPrestation(this.dataOrdLiquide.sousPrestationCode).subscribe(
          (res) => {
            this.prestation = res.msg;
          }
        )
      }
    )
  }

}
