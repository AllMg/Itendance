import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';
import {registerLocaleData} from '@angular/common';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ChartsModule} from 'ng2-charts';
import {NgxSelectModule} from 'ngx-select-ex';
import {HttpClientModule} from '@angular/common/http';
import {PdfViewerModule} from 'ng2-pdf-viewer';

import {AuthGuard} from './guards/auth.guard';
import {UnAuthGuard} from './guards/unauth.guard';
import {FemininGuard} from './guards/Femin.guard';

import {AuthService} from './services/auth/auth.service';
// service
import {TravailleurService} from './services/travailleur/travailleur.service';
import {AppComponent} from './app.component';
import {MenuHautComponent} from './components/menu-haut/menu-haut.component';
import {SliderComponent} from './components/slider/slider.component';
import {MenuCentreComponent} from './components/menu-centre/menu-centre.component';
import {CnapsServiceComponent} from './components/cnaps-service/cnaps-service.component';
import {ActualiteComponent} from './components/actualite/actualite.component';
import {AutreLienComponent} from './components/autre-lien/autre-lien.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component';
import {CnapsMapComponent} from './components/cnaps-map/cnaps-map.component';
import {ConnexionComponent} from './components/connexion/connexion.component';
import {AccueilComponent} from './components/accueil/accueil.component';
import {ReglementOpComponent} from './components/reglement-op/reglement-op.component';
import {ReglementOpValidationComponent} from './components/reglement-op-validation/reglement-op-validation.component';
import {DimmComponent} from './components/dimm/dimm.component';
import {AvisEmbaucheFormComponent} from './components/avis-embauche-form/avis-embauche-form.component';
import {NewIndividusComponent} from './components/new-individus/new-individus.component';
import {InfoIndividusComponent} from './components/info-individus/info-individus.component';
import {DnComponent} from './components/dn/dn.component';
import {BanniereComponent} from './components/banniere/banniere.component';
import {AjoutAdresseComponent} from './components/ajout-adresse/ajout-adresse.component';
import {ModifierResponsableComponent} from './components/modifier-responsable/modifier-responsable.component';
import {ModifierCompteBancaireComponent} from './components/modifier-compte-bancaire/modifier-compte-bancaire.component';
import {IjComponent} from './components/demande/ij/ij.component';
import {ListeIndicateursComponent} from './components/liste-indicateurs/liste-indicateurs.component';
import {AccueilConnecteComponent} from './components/accueil-connecte/accueil-connecte.component';
import {HitoriqueSalaireAnneeComponent} from './components/hitorique-salaire-annee/hitorique-salaire-annee.component';
import {DynamicInputComponent} from './components/dynamic-input/dynamic-input.component';
import {LienFootComponent} from './components/lien-foot/lien-foot.component';
import {HistoriqueIndivComponent} from './components/historique-indiv/historique-indiv.component';
import {InfoEmployeursComponent} from './components/info-employeurs/info-employeurs.component';
import {InfoAgentsComponent} from './components/info-agents/info-agents.component';
import {InfoPersonnesComponent} from './components/info-personnes/info-personnes.component';
import {LiquidationComponent} from './components/liquidation/liquidation.component';
import {DetailsIjComponent} from './components/traitement/traitement-pf/ij1/details-ij/details-ij.component';
import {IjPfComponent} from './components/traitement/traitement-pf/ij1/ij-pf/ij-pf.component';
import {InfoDemandeComponent} from './components/detail-demande-pen/info-demande/info-demande.component';
import localeFr from '@angular/common/locales/fr';

// service

import {Am1Service} from './services/pf/am1/am1.service';
import {Am2Service} from './services/pf/am2/am2.service';
import {ApService} from './services/pf/ap/ap.service';
import {RfaService} from './services/pf/rfa/rfa.service';
import {FmService} from './services/fm/fm.service';
import {Ij2Service} from './services/ij2/ij2.service';
import {ChartService} from './services/chart/chart.service';
import {InfoService} from './services/info/info.service';
import {AdresseService} from './services/adresse/adresse.service';
import {CompteEService} from './services/compte-e/compte-e.service';
import {CompteTService} from './services/compte-t/compte-t.service';
import {FamilleService} from './services/famille/famille.service';
import {IndividuService} from './services/individu/individu.service';
import {PaysService} from './services/pays/pays.service';
import {EmployeurService} from './services/employeur/employeur.service';
import {BanqueService} from './services/banque/banque.service';
import {IjPfService} from './services/ij-pf/ij-pf.service';
import {IjService} from './services/ij/ij.service';
import {InputService} from './services/ij/input-service/input.service';
import {Globals} from './services/Global';
import {OpService} from './services/op/op.service';
import {DlprService} from './services/dlpr/dlpr.service';
import {AtmpService} from './services/atmp/atmp.service';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule, MatSelectModule,
  MatStepperModule, MatTab, MatTableModule, MatTabsModule,
  MatAutocompleteModule
} from '@angular/material';
import {StatusService} from './services/status/status.service';
import {CategorieService} from './services/categorie/categorie.service';
import {ActiviteService} from './services/activite/activite.service';
import {HistoriqueDroitComponent} from './components/historique-droit/historique-droit.component';
import {DnService} from './services/dn/dn.service';
import {DnValidationComponent} from './components/dn-validation/dn-validation.component';
import {DirectionService} from './services/direction/direction.service';
import {CieComponent} from './components/cie/cie.component';
import {CieService} from './services/cie/cie.service';
import {CrgComponent} from './components/crg/crg.component';
import {CrgService} from './services/crg/crg.service';
import {MrComponent} from './components/mr/mr.component';
import {MrService} from './services/mr/mr.service';
import {SoldeComponent} from './components/solde/solde.component';
import {SoldeService} from './services/solde/solde.service';
import {DecompteComponent} from './components/decompte/decompte.component';
import {PratiquesComponent} from './components/pratiques/pratiques.component';
import {AProposComponent} from './components/a-propos/a-propos.component';
import {CnapsSportComponent} from './components/cnaps-sport/cnaps-sport.component';
import {CclComponent} from './components/ccl/ccl.component';

registerLocaleData(localeFr, 'fr');
import {HistoriqueDnComponent} from './components/historique-dn/historique-dn.component';
import {GeolocationService} from './services/geolocation/geolocation.service';
import {NotificationService} from './services/notification/notification.service';
import {CiePeriodeComponent} from './components/cie-periode/cie-periode.component';
import {ListesTravailleursComponent} from './components/listes-travailleurs/listes-travailleurs.component';
import {HistoriqueNotificationComponent} from './components/historique-notification/historique-notification.component';
import {DemandeReversionComponent} from './components/demande-reversion/demande-reversion.component';
import {DemandeReversionService} from './services/reversion-pension/demande-reversion.service';
import {OuvertureDroitAsvtPenComponent} from './components/ouverture-droit-asvt-pen/ouverture-droit-asvt-pen.component';
import {DemandeRappelPenComponent} from './components/demande-rappel-pen/demande-rappel-pen.component';
import {DemandeRevisionPenComponent} from './components/demande-revision-pen/demande-revision-pen.component';
import {DemandeRappelService} from './services/rappel-pension/demande-rappel.service';
import {DemandeRevisionService} from './services/revision-pension/demande-revision.service';
import {PenService} from './services/pension/pen.service';
import {OuvertureDroitAsvtService} from './services/ouverture-droit-asvt-pension/ouverture-droit-asvt.service';
import {TraitementSemIj2Component} from './components/traitement-sem-ij2/traitement-sem-ij2.component';
import {Ij2Component} from './components/demande/ij2/ij2.component';
import {DynamicPiecesComponent} from './components/dynamic-pieces/dynamic-pieces.component';
import {Am2Component} from './components/demande/am2/am2.component';
import {ApComponent} from './components/demande/ap/ap.component';
import {Am1Component} from './components/demande/am1/am1.component';
import {FmComponent} from './components/demande/fm/fm.component';
import {ListAmComponent} from './components/traitement/traitement-pf/am1/list-am/list-am.component';
import {ListAm2Component} from './components/traitement/traitement-pf/am2/list-am2/list-am2.component';
import {FicheAmComponent} from './components/traitement/traitement-pf/am1/fiche-am/fiche-am.component';
import {FicheAm2Component} from './components/traitement/traitement-pf/am2/fiche-am2/fiche-am2.component';
import {DlprComponent} from './components/dlpr/dlpr.component';
import {OrdoComponent} from './components/ordo/ordo.component';


import {DemPaiementOrComponent} from './components/trans-cot-or/dem-paiement-or/dem-paiement-or.component';
import {ListeOrComponent} from './components/trans-cot-or/liste-or/liste-or.component';
import {DemTransCotComponent} from './components/trans-cot-or/dem-trans-cot/dem-trans-cot.component';
import {ListeRembComponent} from './components/trans-cot-or/liste-remb/liste-remb.component';
import {ListeTransCotComponent} from './components/trans-cot-or/liste-trans-cot/liste-trans-cot.component';
import {DetailsTransCotComponent} from './components/trans-cot-or/details-trans-cot/details-trans-cot.component';
import {Ij2PfComponent} from './components/traitement/traitement-pf/ij2/ij2-pf/ij2-pf.component';
import {DetailsIj2Component} from './components/traitement/traitement-pf/ij2/details-ij2/details-ij2.component';
import {TraitAtmpComponent} from './components/trait-atmp/trait-atmp.component';
import {DetailAtmpComponent} from './components/detail-atmp/detail-atmp.component';

import {PrestationChoixComponent} from './components/atmp/prestation-choix/prestation-choix.component';
import {DemandeIjComponent} from './components/atmp/demande-ij/demande-ij.component';
import {DemandeFfComponent} from './components/atmp/demande-ff/demande-ff.component';
import {DemandeFdComponent} from './components/atmp/demande-fd/demande-fd.component';
import {DemandeFpComponent} from './components/atmp/demande-fp/demande-fp.component';
import {DemandeFmComponent} from './components/atmp/demande-fm/demande-fm.component';
import {DemandeRmComponent} from './components/atmp/demande-rm/demande-rm.component';
import {DemandeRippComponent} from './components/atmp/demande-ripp/demande-ripp.component';
import {DemandeAtComponent} from './components/demande-at/demande-at.component';
import {ValidationDatComponent} from './components/validation-dat/validation-dat.component';
import {ListeDemandePenComponent} from './components/liste-demande-pen/liste-demande-pen.component';
import {DetailDemandePenComponent} from './components/detail-demande-pen/detail-demande-pen.component';
import {DetailModifComponent} from './components/detail-demande-pen/detail-modif/detail-modif.component';

import {TransfertCotisationService} from './services/transfert-cotisation/transfert-cotisation.service';
import {SousDemandeComponent} from './components/atmp/sous-demande/sous-demande.component';
import {ProtheseComponent} from './components/prothese/prothese.component';
import {AtmpFfComponent} from './components/atmp-ff/atmp-ff.component';
import {AtmpRenteComponent} from './components/atmp-rente/atmp-rente.component';
import {AtmpFd1Component} from './components/atmp-fd1/atmp-fd1.component';
import {RenteIppComponent} from './components/rente-ipp/rente-ipp.component';
import {AtmpFmComponent} from './components/atmp-fm/atmp-fm.component';
import {AtmpFpComponent} from './components/atmp-fp/atmp-fp.component';
import {TraitementFmComponent} from './components/atmp/traitement-fm/traitement-fm.component';
import {TraitementFmAtmpComponent} from './components/atmp/traitement-fm-atmp/traitement-fm-atmp.component';
import {TraitementFpComponent} from './components/atmp/traitement-fp/traitement-fp.component';
import {TraitementFpAtmpComponent} from './components/atmp/traitement-fp-atmp/traitement-fp-atmp.component';
import {LoaderComponent} from './components/loader/loader.component';
import {PmdMailComponent} from './components/pmd/pmd-mail/pmd-mail.component';
import {DetailsTransCotPiecesComponent} from './components/trans-cot-or/details-trans-cot-pieces/details-trans-cot-pieces.component';
import {ListeDemandeApComponent} from './components/traitement/traitement-pf/ap/liste-demande-ap/liste-demande-ap.component';
import {DetailsApComponent} from './components/traitement/traitement-pf/ap/details-ap/details-ap.component';
import {ListeDemandeRfaComponent} from './components/traitement/traitement-pf/fm/liste-demande-rfa/liste-demande-rfa.component';
import {DetailsRfaComponent} from './components/traitement/traitement-pf/fm/details-rfa/details-rfa.component';
import {DynamicAtmpService} from './services/atmp/dynamic-atmp/dynamic-atmp.service';

import {FicheApComponent} from './components/fiche-ap/fiche-ap.component';
import {ListeDatComponent} from './components/liste-dat/liste-dat.component';
import {TraitementSemRfaComponent} from './components/traitement-sem-rfa/traitement-sem-rfa.component';
import {CiePeriodeService} from './services/cie-periode/cie-periode.service';
import {DecompteIj2Component} from './components/decompte-ij2/decompte-ij2.component';
import {PmdService} from './services/pmd/pmd.service';
import {DemandeAtmpService} from './services/atmp/demande-atmp/demande-atmp.service';
import {PenComponent} from './components/demande/pen/pen.component';
import {DemandePensionService} from './services/pension/demande-pension.service';
import {ListeDemandeComponent} from './components/demande/pen/liste-demande/liste-demande.component';
import {DetailDemandeComponent} from './components/demande/pen/detail-demande/detail-demande.component';
import {AjoutEnfantComponent} from './components/demande/pen/ajout-enfant/ajout-enfant.component';
import {FileService} from './services/file/file.service';
import {InfoPensionComponent} from './components/dlpr/info-pension/info-pension.component';
import {ListeFmComponent} from './components/atmp/sem/liste-fm/liste-fm.component';
import {ListeFpComponent} from './components/atmp/sem/liste-fp/liste-fp.component';
import {ListeFmAtmpComponent} from './components/atmp/liste-fm-atmp/liste-fm-atmp.component';
import {ListeFpAtmpComponent} from './components/atmp/liste-fp-atmp/liste-fp-atmp.component';
import { CreationComponent } from './components/formation/demande/creation/creation.component';
import { ListeDemandeCreationComponent } from './components/formation/liste/liste-demande-creation/liste-demande-creation.component';
import {ValidationDcfComponent} from './components/formation/validation/creation/validation-dcf.component';
import { CalendrierComponent } from './components/calendrier/calendrier.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import { EmploieTempComponent } from './components/module/emploie-temp/emploie-temp.component';
import { DemandeDemissionComponent } from './components/rld/demande-demission/demande-demission.component';
import { DemandeRecrutementComponent } from './components/rld/demande-recrutement/demande-recrutement.component';
import { TablePosteComponent } from './components/module/table-poste/table-poste.component';
import { ListeMouvementRecrutementComponent } from './components/rld/liste/mouvement/liste-mouvement-recrutement.component';
import { ValidationDemRecrutComponent } from './components/rld/validation/mouvement/recrutement/validation-dem-recrut.component';
import { DemandeEmploieComponent } from './components/rld/demande-emploie/demande-emploie.component';
import { ValidRecrutComponent } from './components/rld/validation/recrutement/valid-recrut.component';
import { ValidationDemDemiComponent } from './components/rld/validation/mouvement/demission/validation-dem-demi.component';
import { DemandeRepportComponent } from './components/rld/demande-repport/demande-repport.component';
import { ValidationDemRepComponent } from './components/rld/validation/mouvement/repport/validation-dem-rep.component';
import { DemandeRetraiteComponent } from './components/rld/demande-retraite/demande-retraite.component';
import { ValidationDemRetComponent } from './components/rld/validation/mouvement/retraite/validation-dem-ret.component';
import { ListeFormationsComponent } from './components/formation/liste/liste-formations/liste-formations.component';
import { InscriptionFormationComponent } from './components/formation/demande/inscription-formation/inscription-formation.component';
import {MouvementService} from './services/rh/mouvement.service';
import {AgentGuard} from './guards/agent.guard';
import {DocteurGuard} from './guards/docteur.guard';
import { FilesUploadComponent } from './components/module/files-upload/files-upload.component';
import { EmpruntComponent } from './components/bibliotheque/pret/emprunt/emprunt.component';
import { RetourComponent } from './components/bibliotheque/pret/retour/retour.component';
import { RenouvellementComponent } from './components/bibliotheque/pret/renouvellement/renouvellement.component';
import { AjoutLivreComponent } from './components/bibliotheque/stock/ajout-livre/ajout-livre.component';
import { ListeLivreComponent } from './components/bibliotheque/stock/liste-livre/liste-livre.component';
import { DetailLivreComponent } from './components/bibliotheque/stock/detail-livre/detail-livre.component';
import {TraitDlprComponent} from './components/trait-dlpr/trait-dlpr/trait-dlpr.component';
import {ServiceRhService} from './services/rh/service-rh.service';
import {BasemodelService} from './services/base/basemodel.service';

import {ImmoService} from './services/immo/immo.service';
import {BudgetService} from './services/budget/budget.service';
import { ImmoDmdComponent } from './components/immo-dmd/immo-dmd.component';
import { ImmoListeComponent } from './components/immo-liste/immo-liste.component';
import { ImmoArtComponent } from './components/immo-art/immo-art.component';
import { ImmoInventaireComponent } from './components/immo-inventaire/immo-inventaire.component';
import { ImmoMvtComponent } from './components/immo-mvt/immo-mvt.component';
import { SecVisiteurComponent } from './components/sec-visiteur/sec-visiteur.component';
import { SecAccesComponent } from './components/sec-acces/sec-acces.component';
import { SecAgentComponent } from './components/sec-agent/sec-agent.component';
import { SecSysComponent } from './components/sec-sys/sec-sys.component';
import { SeBudgetComponent } from './components/se-budget/se-budget.component';

import * as $ from 'jquery';

const appRoutes: Routes = [
  {path: '', component: AccueilComponent, canActivate: [UnAuthGuard]},
  {path: 'a-propos', component: AProposComponent},
  {path: 'cnaps-sport', component: CnapsSportComponent},
  {path: 'demande-reversion-pen', component: DemandeReversionComponent, canActivate: [AuthGuard]},
  {path: 'demande-rappel-pen', component: DemandeRappelPenComponent, canActivate: [AuthGuard]},
  {path: 'demande-revision-pen', component: DemandeRevisionPenComponent, canActivate: [AuthGuard]},
  {path: 'ouverture-droit-asvt-pen', component: OuvertureDroitAsvtPenComponent, canActivate: [AuthGuard]},
  {path: 'validation-demande/:id', component: ValidationDatComponent},
  {path: 'historique-cie-periode/:periode', component: CiePeriodeComponent, canActivate: [AuthGuard]},
  {path: 'liste-demande-pension', component: ListeDemandePenComponent, canActivate: [AuthGuard]},
  {path: 'detail-demande-pension/:indice', component: DetailDemandePenComponent, canActivate: [AuthGuard]},
  {path: 'demande-paiement-or', component: DemPaiementOrComponent},
  { path: 'ordonance', component: OrdoComponent },
  { path: 'reglement-op', component: ReglementOpComponent, canActivate: [AuthGuard] },
  { path: 'dlpr', component: DlprComponent, canActivate: [AuthGuard] },
  { path: 'reglement-op/:page', component: ReglementOpComponent, canActivate: [AuthGuard] },
  { path: 'list-am1', component: ListAmComponent, canActivate: [AuthGuard] },
  { path: 'reglement-op', component: ReglementOpComponent, canActivate: [AuthGuard] },
  { path: 'dlpr', component: DlprComponent, canActivate: [UnAuthGuard] },
  { path: 'fiche-am2/:id', component: FicheAm2Component, canActivate: [AuthGuard]},
  { path: 'fiche-am1/:id', component: FicheAmComponent, canActivate: [AuthGuard] },
  { path: 'reglement-op-validation/:idOp', component: ReglementOpValidationComponent, canActivate: [AuthGuard] },
  { path: 'dimm', component: DimmComponent },
  { path: 'avis-embauche-form/:id', component: AvisEmbaucheFormComponent, canActivate: [AuthGuard] },
  { path: 'new-individus', component: NewIndividusComponent, canActivate: [AuthGuard] },
  { path: 'info-individus', component: InfoIndividusComponent, canActivate: [AuthGuard] },
  { path: 'dn', component: DnComponent, canActivate: [AuthGuard] },
  { path: 'dn/:periode', component: DnComponent, canActivate: [AuthGuard] },
  { path: 'dn/:periode/:matricule', component: DnComponent, canActivate: [AuthGuard] },
  { path: 'ajout-adresse', component: AjoutAdresseComponent, canActivate: [AuthGuard] },
  { path: 'modifier-responsable', component: ModifierResponsableComponent, canActivate: [AuthGuard] },
  { path: 'modifier-compte-bancaire', component: ModifierCompteBancaireComponent },
  { path: 'ij', component: IjComponent, canActivate: [AuthGuard] },
  { path: 'ij2', component: Ij2Component, canActivate: [AuthGuard] },
  { path: 'am1', component: Am1Component, canActivate: [AuthGuard] },
  { path: 'am2', component: Am2Component, canActivate: [AuthGuard] },
  { path: 'ap', component: ApComponent, canActivate: [AuthGuard] },
  { path: 'fm', component: FmComponent, canActivate: [AuthGuard] },
  { path: 'liste-indicateurs', component: ListeIndicateursComponent },
  { path: 'accueil-connecte', component: AccueilConnecteComponent, canActivate: [AuthGuard] },
  { path: 'banniere', component: BanniereComponent, canActivate: [AuthGuard] },
  { path: 'historique-salaire-annee/:indice', component: HitoriqueSalaireAnneeComponent, canActivate: [AuthGuard] },
  { path: 'liquidation', component: LiquidationComponent, canActivate: [AuthGuard] },
  { path: 'details-ij/:id', component: DetailsIjComponent, canActivate: [AuthGuard] },
  { path: 'details-ij2/:id', component: DetailsIj2Component, canActivate: [AuthGuard] },
  { path: 'ij-pf', component: IjPfComponent, canActivate: [AuthGuard] },
  { path: 'ij2-pf', component: Ij2PfComponent, canActivate: [AuthGuard] },
  { path: 'historique-droit/:id', component: HistoriqueDroitComponent },
  { path: 'dn-validation', component: DnValidationComponent, canActivate: [AuthGuard] },
  { path: 'situation-compte', component: CieComponent, canActivate: [AuthGuard] },
  { path: 'solde', component: SoldeComponent, canActivate: [AuthGuard] },
  { path: 'crg', component: CrgComponent, canActivate: [AuthGuard] },
  { path: 'mr', component: MrComponent, canActivate: [AuthGuard] },
  { path: 'decompte/:id', component: DecompteComponent, canActivate: [AuthGuard] },
  { path: 'decompte-ij2/:id', component: DecompteIj2Component, canActivate: [AuthGuard]},
  { path: 'pratiques', component: PratiquesComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'cnaps-sport', component: CnapsSportComponent },
  { path: 'ccl', component: CclComponent },
  { path: 'historique-dn', component: HistoriqueDnComponent, canActivate: [AuthGuard] },
  { path: 'historique-notification/:id', component: HistoriqueNotificationComponent, canActivate: [AuthGuard] },
  { path: 'liste-travailleur', component: ListesTravailleursComponent, canActivate: [AuthGuard] },
  { path: 'liste-demande/:page/:size', component: ListeDatComponent, canActivate: [AuthGuard] },
  { path: 'validation-demande/:id', component: ValidationDatComponent, canActivate: [AuthGuard] },
  { path: 'historique-cie-periode/:periode', component: CiePeriodeComponent, canActivate: [AuthGuard] },
  { path: 'demande-transfert-cotisation', component: DemTransCotComponent, canActivate: [AuthGuard] },
  { path: 'liste-transfert-cotisation', component: ListeTransCotComponent, canActivate: [AuthGuard] },
  { path: 'detail-transfert-cotisation/:etat/:idacc/:matricule', component: DetailsTransCotComponent, canActivate: [AuthGuard] },
  { path: 'detail-transfert-cotisation-pieces/:matricule', component: DetailsTransCotPiecesComponent, canActivate: [AuthGuard] },
  { path: 'demande-paiement-or', component: DemPaiementOrComponent },
  { path: 'liste-or', component: ListeOrComponent },
  { path: 'liste-remboursement', component: ListeRembComponent },
  { path: 'historique-cie-periode/:periode', component: CiePeriodeComponent, canActivate: [AuthGuard] },
  { path: 'liste-demande-ap', component: ListeDemandeApComponent, canActivate: [AuthGuard] },
  { path: 'details-ap/:id', component: DetailsApComponent, canActivate: [AuthGuard] },
  { path: 'liste-demande-rfa', component: ListeDemandeRfaComponent, canActivate: [AuthGuard] },
  { path: 'details-rfa/:id', component: DetailsRfaComponent, canActivate: [AuthGuard] },
  { path: 'traitement_sem_ij2/:id', component: TraitementSemIj2Component },
  { path: 'traitement-sem-rfa/:id', component: TraitementSemRfaComponent, canActivate: [AuthGuard] },
  { path: 'historique-cie-periode/:periode', component: CiePeriodeComponent, canActivate: [AuthGuard] },
  { path: 'liste-am1', component: ListAmComponent },
  { path: 'liste-am2', component: ListAm2Component },
  { path: 'fiche-ap/:id', component: FicheApComponent },
  { path: 'liste-atmp/:prestation/:nom_prest', component: TraitAtmpComponent },
  { path: 'detail-atmp/:id', component: DetailAtmpComponent },
  { path: 'detail-FF/:id', component: AtmpFfComponent },
  { path: 'atmp-rente/:id', component: AtmpRenteComponent },
  { path: 'atmp/prestation/:id', component: PrestationChoixComponent },
  { path: 'pmd-mail', component: PmdMailComponent },
  {path: 'demande/:prestation', component: PenComponent, canActivate: [AuthGuard]},
  {path: 'liste-atmp/:prestation/:nom_prest/:etat/:page/:size', component: TraitAtmpComponent, canActivate: [AuthGuard]},
 { path: 'detail-atmp/:id', component: DetailAtmpComponent, canActivate: [AuthGuard] },
   {path: 'detail-FM/:id', component: AtmpFmComponent, canActivate: [AuthGuard]},
    {path: 'detail-FF/:id', component: AtmpFfComponent, canActivate: [AuthGuard]},
   {path: 'detail-IPP/:id', component: RenteIppComponent, canActivate: [AuthGuard]},
   {path: 'detail-FD1/:id', component: AtmpFd1Component, canActivate: [AuthGuard]},
   {path: 'detail-FP/:id', component: AtmpFpComponent, canActivate: [AuthGuard]},
   {path: 'atmp-rente/:id', component: AtmpRenteComponent, canActivate: [AuthGuard]},

  { path: 'pmd-mail', component: PmdMailComponent, canActivate: [AuthGuard] },
  { path: 'liste-am1', component: ListAmComponent, canActivate: [AuthGuard] },
  { path: 'liste-am2', component: ListAm2Component, canActivate: [AuthGuard] },
  { path: 'fiche-ap/:id', component: FicheApComponent, canActivate: [AuthGuard] },

  {path: 'atmp/prestation/:id', component: SousDemandeComponent, canActivate: [AuthGuard]},
  {path: 'atmp/prestation', component: SousDemandeComponent, canActivate: [AuthGuard]},
  {path: 'atmp/demande/ij/:id', component: DemandeIjComponent, canActivate: [AuthGuard]},
  {path: 'atmp/demande/ff/:id', component: DemandeFfComponent, canActivate: [AuthGuard]},
  {path: 'atmp/demande/fd/:id', component: DemandeFdComponent, canActivate: [AuthGuard]},
  {path: 'atmp/demande/fm/:id', component: DemandeFmComponent, canActivate: [AuthGuard]},
  {path: 'atmp/demande/fp/:id', component: DemandeFpComponent, canActivate: [AuthGuard]},
  {path: 'demande-at', component: DemandeAtComponent, canActivate: [AuthGuard]},
  {path: 'atmp/validation/fm/:id', component: TraitementFmComponent, canActivate: [AuthGuard]},
  {path: 'atmp/validation/fp/:id', component: TraitementFpComponent, canActivate: [AuthGuard]},
  {path: 'atmp/traitement/fm/:id', component: TraitementFmAtmpComponent, canActivate: [AuthGuard]},
  {path: 'atmp/traitement/fp/:id', component: TraitementFpAtmpComponent, canActivate: [AuthGuard]},
  {path: 'pmd-mail', component: PmdMailComponent},
  {path: 'demande/:prestation', component: PenComponent, canActivate: [UnAuthGuard]},
  {path: 'liste-demande/:prestation', component: ListeDemandeComponent, canActivate: [AuthGuard]},
  {path: 'detail-demande/:accueil', component: DetailDemandeComponent, canActivate: [AuthGuard]},
  {path: 'ajouter-enfant/:accueil', component: AjoutEnfantComponent, canActivate: [AuthGuard]},
  {path: 'detail-modif/:indice', component: DetailModifComponent, canActivate: [AuthGuard]},
  {path: 'info-pension', component: InfoDemandeComponent},
  {path: 'info-pension-dlpr', component: InfoPensionComponent},
  {path: 'sem/liste-fm', component: ListeFmComponent, canActivate: [DocteurGuard]},
  {path: 'sem/liste-fp', component: ListeFpComponent, canActivate: [DocteurGuard]},
  {path: 'atmp/liste-fm', component: ListeFmAtmpComponent, canActivate: [AgentGuard]},
  {path: 'atmp/liste-fp', component: ListeFpAtmpComponent, canActivate: [AgentGuard]},
  {path: 'formation/demande/creation', component: CreationComponent},
  {path: 'formation/liste/creation', component: ListeDemandeCreationComponent},
  {path: 'formation/validation/creation', component: ValidationDcfComponent},
  {path: 'formations', component: ListeFormationsComponent},
  {path: 'formation/:id', component: ListeFormationsComponent},
  {path: 'recrutement/demande', component: DemandeRecrutementComponent, canActivate: [AgentGuard]},
  {path: 'demission/demande', component: DemandeDemissionComponent, canActivate: [AgentGuard]},
  {path: 'faute/demande', component: DemandeRepportComponent},
  {path: 'retraite/demande', component: DemandeRetraiteComponent},
  {path: 'mouvements/:type', component: ListeMouvementRecrutementComponent},
  {path: 'mouvement/M23/:id', component: ValidationDemRecrutComponent},
  {path: 'mouvement/M06/:id', component: ValidationDemDemiComponent},
  {path: 'mouvement/M24/:id', component: ValidationDemRepComponent},
  {path: 'mouvement/M25/:id', component: ValidationDemRetComponent},
  {path: 'recrutement', component: DemandeEmploieComponent},
  {path: 'recrutements/validation', component: ValidRecrutComponent},
  {path: 'bibliotheque/emprunt', component: EmpruntComponent},
  {path: 'bibliotheque/retour', component: RetourComponent},
  {path: 'bibliotheque/renouvellement', component: RenouvellementComponent},
  {path: 'bibliotheque/ajout-livre', component: AjoutLivreComponent},
  {path: 'bibliotheque/livres', component: ListeLivreComponent},
  {path: 'bibliotheque/livre/:id', component: DetailLivreComponent},
  {path: 'calendar', component: CalendrierComponent},
  {path: 'immo-dmd', component: ImmoDmdComponent},
  {path: 'immo-liste', component: ImmoListeComponent},
  {path: 'immo-art', component: ImmoArtComponent},
  {path: 'immo-mvt', component: ImmoMvtComponent},
  {path: 'immo-inventaire', component: ImmoInventaireComponent},
  {path: 'sec-visiteur', component: SecVisiteurComponent},
  {path: 'sec-acces', component: SecAccesComponent},
  {path: 'sec-agent', component: SecAgentComponent},
  {path: 'sec-sys', component: SecSysComponent},
  {path: 'se-bp', component: SeBudgetComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DnValidationComponent,
    MenuHautComponent,
    SliderComponent,
    MenuCentreComponent,
    CnapsServiceComponent,
    ActualiteComponent,
    AutreLienComponent,
    ContactComponent,
    FooterComponent,
    CnapsMapComponent,
    ConnexionComponent,
    AccueilComponent,
    ReglementOpComponent,
    ReglementOpValidationComponent,
    DimmComponent,
    AvisEmbaucheFormComponent,
    NewIndividusComponent,
    InfoIndividusComponent,
    DnComponent,
    BanniereComponent,
    AjoutAdresseComponent,
    ModifierResponsableComponent,
    ModifierCompteBancaireComponent,
    IjComponent,
    ListeIndicateursComponent,
    AccueilConnecteComponent,
    HitoriqueSalaireAnneeComponent,
    DynamicInputComponent,
    InfoPersonnesComponent,
    HistoriqueIndivComponent,
    LienFootComponent,
    InfoEmployeursComponent,
    InfoAgentsComponent,
    LiquidationComponent,
    DetailsIjComponent,
    IjPfComponent,
    HistoriqueDroitComponent,
    DnValidationComponent,
    CieComponent,
    CrgComponent,
    MrComponent,
    SoldeComponent,
    DecompteComponent,
    PratiquesComponent,
    AProposComponent,
    CnapsSportComponent,
    CclComponent,
    HistoriqueDnComponent,
    ListesTravailleursComponent,
    HistoriqueNotificationComponent,
    CiePeriodeComponent,
    DemandeReversionComponent,
    OuvertureDroitAsvtPenComponent,
    DemandeRappelPenComponent,
    DemandeRevisionPenComponent,
    DemandeAtComponent,
    Ij2Component,
    ListeDemandeApComponent,
    DetailsApComponent,
    DemandeAtComponent,
    ListeDemandeRfaComponent,
    DetailsRfaComponent,
    TraitementSemIj2Component,
    TraitementSemRfaComponent,
    ListeDatComponent,
    ValidationDatComponent,
    Ij2Component,
    DynamicPiecesComponent,
    Am1Component,
    Am2Component,
    ApComponent,
    FmComponent,
    Ij2PfComponent,
    DetailsIj2Component,
    ListAmComponent,
    FicheAmComponent,
    FicheAm2Component,
    ListAm2Component,
    DlprComponent,
    ListeDatComponent,
    OrdoComponent,
    DemPaiementOrComponent,
    ListeOrComponent,
    DemTransCotComponent,
    ListeRembComponent,
    ListeTransCotComponent,
    DetailsTransCotComponent,
    Ij2PfComponent,
    DetailsIj2Component,
    ListeDemandePenComponent,
    DetailDemandePenComponent,
    DetailModifComponent,
    TraitAtmpComponent,
    DetailAtmpComponent,
    PrestationChoixComponent,
    AtmpFfComponent,
    AtmpRenteComponent,
    AtmpFd1Component,
    RenteIppComponent,
    AtmpFmComponent,
    AtmpFpComponent,
    PrestationChoixComponent,
    DemandeIjComponent,
    DemandeFfComponent,
    DemandeFdComponent,
    DemandeFpComponent,
    DemandeFmComponent,
    DemandeRmComponent,
    DemandeRippComponent,
    DetailsIj2Component,
    DemandeAtComponent,
    ListeDatComponent,
    FicheApComponent,
    TraitementSemRfaComponent,
    DecompteIj2Component,
    ListeDemandePenComponent,
    DetailDemandePenComponent,
    SousDemandeComponent,
    ProtheseComponent,
    TraitementFmComponent,
    TraitementFmAtmpComponent,
    TraitementFpComponent,
    TraitementFpAtmpComponent,
    LoaderComponent,
    PmdMailComponent,
    DetailsTransCotPiecesComponent,
    PenComponent,
    ListeDemandeComponent,
    DetailDemandeComponent,
    AjoutEnfantComponent,
    InfoDemandeComponent,
    InfoPensionComponent,
    ListeFmComponent,
    ListeFpComponent,
    ListeFmAtmpComponent,
    ListeFpAtmpComponent,
    CreationComponent,
    ListeDemandeCreationComponent,
    ValidationDcfComponent,
    CalendrierComponent,
    EmploieTempComponent,
    DemandeDemissionComponent,
    DemandeRecrutementComponent,
    TablePosteComponent,
    ListeMouvementRecrutementComponent,
    ValidationDemRecrutComponent,
    DemandeEmploieComponent,
    ValidRecrutComponent,
    ValidationDemDemiComponent,
    DemandeRepportComponent,
    ValidationDemRepComponent,
    DemandeRetraiteComponent,
    ValidationDemRetComponent,
    ListeFormationsComponent,
    InscriptionFormationComponent,
    FilesUploadComponent,
    EmpruntComponent,
    RetourComponent,
    RenouvellementComponent,
    AjoutLivreComponent,
    ListeLivreComponent,
    DetailLivreComponent,
    TraitDlprComponent,
    ImmoDmdComponent,
    ImmoListeComponent,
    ImmoArtComponent,
    ImmoInventaireComponent,
    ImmoMvtComponent,
    SecVisiteurComponent,
    SecAccesComponent,
    SecAgentComponent,
    SecSysComponent,
    SeBudgetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules}),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ChartsModule,
    NgxSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    PdfViewerModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    FullCalendarModule,
    MatAutocompleteModule
  ],
  providers: [
    DatePipe,
    DlprService,
    AuthService,
    FileService,
    AuthGuard,
    UnAuthGuard,
    AgentGuard,
    DocteurGuard,
    ChartService,
    InfoService,
    AdresseService,
    CompteEService,
    CompteTService,
    FamilleService,
    IndividuService,
    PaysService,
    TravailleurService,
    EmployeurService,
    BanqueService,
    IjService,
    Ij2Service,
    Am1Service,
    Am2Service,
    ApService,
    FmService,
    InputService,
    IjPfService,
    Globals,
    DnService,
    StatusService,
    CategorieService,
    ActiviteService,
    HistoriqueDroitComponent,
    DnService,
    DnValidationComponent,
    DirectionService,
    OpService,
    CieService,
    MrService,
    CrgService,
    SoldeService,
    NotificationService,
    GeolocationService,
    DatePipe,
    Globals,
    CiePeriodeService,
    DemandeReversionService,
    DemandeRappelService,
    DemandeRevisionService,
    OuvertureDroitAsvtService,
    AtmpService,
    FileService,
    PenService,
    TransfertCotisationService,
    DynamicAtmpService,
    PenService,
    TransfertCotisationService,
    RfaService,
    ToastrService,
    PmdService,
    DemandeAtmpService,
    DemandePensionService,
    MouvementService,
    ServiceRhService,
    BasemodelService,
    ImmoService,
    BudgetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
