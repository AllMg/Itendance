import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {IndividuService} from '../../services/individu/individu.service';
import {IjService} from '../../services/ij/ij.service';

@Component({
  selector: 'app-lien-foot',
  templateUrl: './lien-foot.component.html',
  styleUrls: ['./lien-foot.component.css']
})
export class LienFootComponent implements OnInit {

  private user: any;
  entity: string;

  constructor(
    private routes: Router,
    private toastr: ToastrService,
    private indivService: IndividuService,
    private ijService: IjService
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      this.entity = this.user.type_entite;
    }
  }

  // Lien employeur
  employeurAdresse() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/ajout-adresse']);
    }
  }

  employeurCompteBancaire() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/modifier-compte-bancaire']);
    }
  }

  employeurResponsable() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/modifier-responsable']);
    }
  }

  employeurAvisEmbauche() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/avis-embauche-form/0']);
    }
  }

  employeurDn() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/dn']);
    }
  }

  employeurSituationCompte() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/situation-compte']);
    }
  }

  employeurHistoriqueDn() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/historique-dn']);
    }
  }

  employeurListeEmploye() {
    if (this.entity !== 'E') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un employeur');
    } else {
      this.routes.navigate(['/liste-travailleur']);
    }
  }

  // Lien Travailleur
  travailleurAdresse() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.routes.navigate(['/ajout-adresse']);
    }
  }

  travailleurCompteBancaire() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.routes.navigate(['/modifier-compte-bancaire']);
    }
  }

  travailleurSalaire() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.routes.navigate(['/historique-salaire-annee/0']);
    }
  }

  travailleurAvisEmbauche() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.routes.navigate(['/avis-embauche-form/0']);
    }
  }

  travailleurIj() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.indivService.infoIndiv(this.user.id_acces).subscribe(data => {
        if (data.success) {
          const user = data.msg;
          if (user.id_sexe.id_sexe !== 'M') {
            this.routes.navigate(['/ij']);
          } else {
            setTimeout(() => this.toastr.error('Vous n' + '\'' + 'êtes pas une femme'));
          }
        } else {
          setTimeout(() => this.toastr.error('Erreur info Individu'));
        }
      });
    }
  }

  travailleurTransfertCotisation() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.routes.navigate(['/demande-transfert-cotisation']);
    }
  }

  travailleurPaiementOrdreRecette() {
    if (this.entity !== 'T') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un travailleur');
    } else {
      this.routes.navigate(['/demande-paiement-or']);
    }
  }

  // Lien Agent
  agentDimm() {
    if (this.entity !== 'E' && this.entity !== 'T') {
      this.routes.navigate(['/dimm']);
    } else {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un agent');
    }
  }

  agentDn() {
    if (this.entity !== 'E' && this.entity !== 'T') {
      this.routes.navigate(['/dn']);
    } else {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un agent');
    }
  }

  agentIjPf() {
    if (this.entity !== 'P') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un agent prestation familiale');
    } else {
      this.routes.navigate(['/ij-pf']);
    }
  }

  agentReglementOp() {
    if (this.entity !== 'O') {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un agent trésorerie ou prestation familiale');
    }
    if (this.entity === 'P') {
      this.routes.navigate(['/reglement-op']);
    } else {
      this.routes.navigate(['/reglement-op']);
    }
  }

  agentListeTransfert() {
    if (this.entity !== 'T' && this.entity !== 'E') {
      this.routes.navigate(['/liste-transfert-cotisation']);
    } else {
      this.toastr.error('Vous n' + '\'' + 'êtes pas un agent CNaPS.');
    }
  }
}
