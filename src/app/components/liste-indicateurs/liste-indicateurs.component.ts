import { Component, OnInit, ViewChild} from '@angular/core';
import { ChartService} from '../../services/chart/chart.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-liste-indicateurs',
  templateUrl: './liste-indicateurs.component.html',
  styleUrls: ['./liste-indicateurs.component.css']
})
export class ListeIndicateursComponent implements OnInit {
/*   chart DSV-EMPL*/
  public lineChartDSVData:Array<any> = [];
  public lineChartDSVLabels: string[] = [];
  public lineChartDSVOptions:any = {
    responsive: true
  };
  public lineChartDSVLegend:boolean = true;
  public lineChartDSVType:string = 'line';
  public lineChartDSVColors:Array<any> = [
    { // vert ok
      backgroundColor: 'rgba(215, 44, 44, 0)',
      borderColor: 'rgba(114, 255, 55, 0.9)',
      pointBackgroundColor: 'rgba(29, 20, 36, 0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(29, 20, 36, 0.5)'
    }
    ,
    { // blue
      backgroundColor: 'rgba(215, 44, 44, 0)',
      borderColor: 'rgb(3,158,194)',
      pointBackgroundColor: 'rgba(29, 20, 36, 0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(29, 20, 36, 0.5)'
    }];

  public linChartData:Array<any> = [];
  
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];

  public pieChartType = 'pie';
  public pieChartLabels2: string[] = ['1', '2', '3'];
  public pieChartData2: number[] = [300, 500, 100];
  public pieChartType2 = 'pie';

  public okData: number[] = [];
  public okLabels: string[] = [];

  public cData: number[] = [];
  public cLabels: string[] = [];

  public dData: number[] = [];
  public dLabels: string[] = [];

  public tauxData: number[] = [];
  public tauxLabels: string[] = [];

  public periodeSoldeData: any[] = [];
  public periodeSoldeLabels: string[] = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: true
    },
    scales : { yAxes: [{ ticks: { steps : 5, stepValue : 5, min : 0} }] }
  };
  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [ {data: [], label: 'Année', backgroundColor: 'rgb(3,158,194)'} ];
  
  public lineChartLabels: string[] = [];
  public lineChartOptions:any = {
    responsive: true
  };
  
  public lineChartColors:Array<any> = [
    { // vert ok
      backgroundColor: 'rgba(215, 44, 44, 0)',
      borderColor: 'rgba(114, 255, 55, 0.9)',
      pointBackgroundColor: 'rgba(29, 20, 36, 0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(29, 20, 36, 0.5)'
    }
    ,
    { // blue
      backgroundColor: 'rgba(215, 44, 44, 0)',
      borderColor: 'rgb(3,158,194)',
      pointBackgroundColor: 'rgba(29, 20, 36, 0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(29, 20, 36, 0.5)'
    },
    
    { // rouge debiteur 
      backgroundColor: 'rgba(215, 44, 44, 0)',
      borderColor: 'rgba(255, 10, 20, 1)',
      pointBackgroundColor: 'rgba(29, 20, 36, 0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(29, 20, 36, 0.5)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 


  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgb(3,158,194)',
    }];

  @ViewChild(BaseChartDirective) customerStateChart: any;
  @ViewChild(BaseChartDirective) customerReleaseChart: any;

  @ViewChild('camembert')
  chart: BaseChartDirective;
  @ViewChild('baseHisto')
  baseHisto: BaseChartDirective;

  public debut: String;
  public fin: String;
  public debutSolde: string;
  public finSolde: string;
  titre:String;
  data: any;
  show: boolean;
  GettingBarLoader : boolean;
  showDSV:boolean;
  showSoldeindicateur:boolean;
  showSolde: boolean;
  showTaux: boolean;
  showBarperiode: boolean;
  
  debutsoldeInput: any;
  finsoldeInput: any;
  model: {
    data: any[],
    label: 'Séries A'
  };

  constructor(private chartService: ChartService, private toastr: ToastrService) {
   
    this.debut = '2010';
    this.fin = '' +  new Date().getFullYear();
    this.debutSolde = '2010';
    this.finSolde = '' +  new Date().getFullYear();
   }

  ngOnInit() {
    this.titre="DSV - MT(Déclaration sans versement)";
    this.show = true;
    this.showSolde = true;
    this.showTaux = true;
    this.showBarperiode = true;
    this.showDSV=true;
    this.showSoldeindicateur=false;
    this.chartService.camembert(this.debut, this.fin).subscribe(data => {
        if (data.success) {
          this.show = false;
          this.data = JSON.parse(JSON.stringify(data.msg));
          this.initData();
        } else {
          this.show = false;
          alert(data.msg);
        }
    });
    this.chartService.soldeAnnee(this.debut, this.fin).subscribe(data => {
      if (data.success) {
        this.initDataSolde(data.msg);
      } else {
        this.showSolde = false;
        alert(data.msg);
      }
    });
    this.chartService.solde(this.debut, this.fin).subscribe(data => {
      if (data.success) {
        this.initDataTaux(data.msg);
      } else {
        this.showTaux = false;
        alert(data.msg);
      }
    });
    this.chartService.soldePeriode(this.debut, this.fin).subscribe(data => {
      if (data.success) {
        this.initDataPeriodeSolde(data.msg);
      } else {
        this.showBarperiode = false;
        alert(data.msg);
      }
    });
  }
 
  

  initData() {
    this.lineChartDSVData=[];
    this.lineChartDSVLabels=[];
      const data = this.data;
      const size = data.length;
      let data1:Array<any> = [];
      let data2:Array<any> = [];

      for (let i = 0; i < size; i++) {
        const a = data[i];
        this.pieChartLabels.push(a.annee);
        this.pieChartData.push(a.taux);
        this.lineChartDSVLabels.push(a.annee);
        data1.push(a.total);
        data2.push(a.nonPaye);
      }
      this.lineChartDSVData.push({data:data1, label: 'Nombre Employeur Affillié' });
      this.lineChartDSVData.push({data:data2, label: 'Nombre Employeur DSV' });
     
  }
  initDataSolde(data: any[]) {
    this.okLabels = [];
    this.cLabels = [];
    this.dLabels = [];

    this.okData = [];
    this.cData = [];
    this.dData = [];
    for (const a of data) {
      const periode = a.periode;
      this.okLabels.push(periode);
      this.cLabels.push(periode);
      this.dLabels.push(periode);
      this.lineChartLabels.push(periode);
     
      this.okData.push(a.tauxOk);
      this.cData.push(a.tauxC);
      this.dData.push(a.tauxD);
      
    }

    this.linChartData.push({ data: this.okData, label: 'Ok' });
    this.linChartData.push({ data: this.cData, label: 'Créditeur' });   
    this.linChartData.push({ data: this.dData, label: 'Débiteur' });
    
    
    
    this.showSolde = false;
  }
  initDataTaux(data: any) {
    this.tauxData = [];
    this.tauxLabels = [];
    this.tauxLabels.push('Ok');
    this.tauxLabels.push('Créditeur');
    this.tauxLabels.push('Débiteur');
    this.tauxData = [data.tauxOk, data.tauxC, data.tauxD];
    this.showTaux = false;
   
  }
  initDataPeriodeSolde(data: any[]) {
    this.periodeSoldeLabels = [];
    this.periodeSoldeData = [];
    const dataOk = [];
    const dataC = [];
    const dataD = [];
    let k=0;
    for (const a of data) {

      this.periodeSoldeLabels.push(a.periode);
     
      dataOk.push(a.tauxOk);
      dataC.push(a.tauxC);
      dataD.push(a.tauxD);
      
       }
    this.periodeSoldeData.push( { data: dataOk, label: 'Ok' } );
    this.periodeSoldeData.push( { data: dataC, label: 'Créditeur' } );
    this.periodeSoldeData.push( { data: dataD, label: 'Débiteur' } );
  
  
     
    this.showBarperiode = false;
  }
  initDataBar(data) {
    const size = data.length;
    const dta: any[] = [];
    for (let i = 0; i < size; i++) {
      const a = data[i];
      this.barChartLabels.push(a.periode);
      this.barChartData[0].data.push(a.taux);

    }

  }
  clear() {
    this.lineChartDSVData=[];
    this.lineChartDSVLabels=[];
    this.pieChartLabels = [];
    this.pieChartData = [];
  }
  onChangeDebut($event) {
      this.debut = $event;

      const graph = this;
      if(this.debut.length===4)
      {
      this.show = true;
    
      this.chartService.camembert(this.debut, this.fin).subscribe(data => {
        if (data.success) {
          this.pieChartLabels = [];
          this.pieChartData = [];
          this.data = JSON.parse(JSON.stringify(data.msg));
          this.initData();
          this.show = false;

        } else {
          alert(data.msg);
          this.show = false;
        }
     
    }); }
  }
  onChangeFin($event) {
    this.fin = $event;
    if(this.fin.length==4)
    {
    this.show = true;
    const graph = this;
    this.chartService.camembert(this.debut, this.fin).subscribe(data => {
      if (data.success) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.data = JSON.parse(JSON.stringify(data.msg));
        this.initData();
        this.show = false;
      } else {
        alert(data.msg);
      }
  });
  }
}

  onChangeDebutSolde($event) {
    this.debutSolde = $event;
    
    this.showSolde = true;
    this.showTaux = true;
    this.showBarperiode = true;
    this.chartService.soldeAnnee(this.debutSolde, this.finSolde).subscribe(data => {
      if (data.success) {
        this.initDataSolde(data.msg);
      } else {
       this.toastr.error(data.msg);
      }
    });
 
    this.chartService.solde(this.debutSolde, this.finSolde).subscribe(data => {
      if (data.success) {
        this.initDataTaux(data.msg);
      } else {
        this.toastr.error(data.msg);
      }
    });
    this.chartService.soldePeriode(this.debutSolde, this.finSolde).subscribe(data => {
      if (data.success) {
        this.initDataPeriodeSolde(data.msg);
      } else {
        this.showBarperiode = false;
        alert(data.msg);
      }
    });
  
  }
  onChangeD()
  {
    let debsolde=this.debutSolde; 
    let timeout = null;
    let component = this;
   
    if(debsolde.length===4)
    {
    this.linChartData=[];
    this.lineChartLabels=[];  
    this.onChangeDebutSolde(debsolde);
     
    
    }

     
  }
  onChangeF()
  {
    let finsolde= this.finSolde;
    let timeout = null;
    let component = this;
    
    if(finsolde.length===4)
    {
      this.linChartData=[];
      this.lineChartLabels=[];  
      this.onChangeFinSolde(finsolde);
     
    }
     /*let timeout = null;
    let component = this;
     clearTimeout(timeout);
      timeout = setTimeout(function () {
        component.onChangeFinSolde(this.finSolde);
      }, 1000);*/
  }

  onChangeFinSolde($event) {
    this.finSolde = $event;
      this.showSolde = true;
        this.showTaux = true;
        this.showBarperiode = true;
        this.chartService.soldeAnnee(this.debutSolde, this.finSolde).subscribe(data => {
          if (data.success) {
            this.initDataSolde(data.msg);
          } else {
            this.toastr.error(data.msg);
          }
        });
        this.chartService.solde(this.debutSolde, this.finSolde).subscribe(data => {
          if (data.success) {
            this.initDataTaux(data.msg);
          } else {
            this.toastr.error(data.msg);
          }
        });

        this.chartService.soldePeriode(this.debutSolde, this.finSolde).subscribe(data => {
          if (data.success) {
            this.initDataPeriodeSolde(data.msg);
          } else {
            this.showBarperiode = false;
            alert(data.msg);
          }
        });
      
  }

  chartClicked(e: any): void {
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
        if ( activePoints.length > 0) {
          
          const clickedElementIndex = activePoints[0]._index;
          const label = chart.data.labels[clickedElementIndex];
          const value = chart.data.datasets[0].data[clickedElementIndex];
          const color = chart.data.datasets[0].backgroundColor[clickedElementIndex];
          this.GettingBarLoader=true;
          this.initDataHisto(label, color);
        }
       }
  }
  viewTsoldes(){
  this.debutsoldeInput = document.getElementById('dSolde');
  this.finsoldeInput = document.getElementById('fSolde');
   
  this.showSoldeindicateur=true;
  this.showDSV=false;
  this.titre="Taux de Solde";
  }
  viewDSV(){
    this.titre="DSV - Empl(Déclaration sans versement)";
    this.showSoldeindicateur=false;
    this.showDSV=true;
  }
  initDataHisto(annee, color) {
    this.chartService.histo(annee).subscribe(data => {
      if (data.success) {
        this.barChartLabels = [];
        this.GettingBarLoader=false;
        this.barChartData = [{data : [], label: annee, backgroundColor: color}];
        const dataHisto = JSON.parse(JSON.stringify(data.msg));
        this.initDataBar(dataHisto);
        this.baseHisto.chart.config.data.labels = this.barChartLabels;
        this.baseHisto.chart.config.data.datasets = this.barChartData;
        this.baseHisto.chart.update();
      } else {
        alert(data.msg);
      }
  });
  }

}
