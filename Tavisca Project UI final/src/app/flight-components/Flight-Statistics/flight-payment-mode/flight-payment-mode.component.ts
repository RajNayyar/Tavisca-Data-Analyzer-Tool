import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-flight-payment-mode',
  templateUrl: './flight-payment-mode.component.html',
  styleUrls: ['./flight-payment-mode.component.css']
})
export class FlightPaymentModeComponent implements OnInit {

  chart: string = "line";
  errorMsg: any
  paymentType: any=[];
  NumberOfBooking: any = [];
  graphDataPoints= [];
  id:string="flight-payment-mode-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    
     this.reRender()
    }
    reRender()
    {
      this.loaderDisplay = true;
      this.paymentType = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","PaymentType?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.paymentType.push(data[i].paymentType);
                          this.NumberOfBooking.push(data[i].numberOfBookings);
                        }
                        this.DisplayGraph( this.chart);
                  },
          error=>{ this.errorMsg = error;}

            );

    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'area', viewValue: 'area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];

    GraphSelect(graphValue)
    {
      this.chart = graphValue;
      this.DisplayGraph(this.chart);
    }

      setDataPoints(xAxis, yAxis)
      {
        this.graphDataPoints = [];
        for(var i = 0; i<xAxis.length;i++)
        {
          this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
        }
        
      }
      DisplayGraph(chart ) {
        this.loaderDisplay = false;
        this.setDataPoints(this.paymentType,this.NumberOfBooking)

        var chart = new CanvasJS.Chart(this.id, {
          zoomEnabled:true,
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", 
          title:{
            text: "Payment Mode Graph"
          },
          data: [{
            type: chart, 
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: this.graphDataPoints,
            click: function (e) {
              alert(e.dataPoint.y +" "+e.dataPoint.label)
            }
          }]
        });
        chart.render();
      }
 
}
