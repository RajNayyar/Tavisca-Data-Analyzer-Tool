import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'payment-mode-based-graph',
  templateUrl: './payment-mode-based-graph.component.html',
  styleUrls: ['./payment-mode-based-graph.component.css']
})
export class PaymentModeBasedGraphComponent implements OnInit {

  GraphTypeValue: string
  title = 'Modes of Payment';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  PaymentType: any=[];
  NumberOfBooking: any = [];
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  graphDataPoints= [];
  id:string="payment-mode-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) {
   
   }

 
  ngOnInit(){
    this.reRender()
    }
    reRender()
    {
      this.loaderDisplay=true
    this.hotelLocationGraph = null;
    this.defaultGraphType = "line";
    this.PaymentType = []
    this.NumberOfBooking= []

       this.service.httpResponseFilters("Hotels","PaymentType?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
           
                    for(var i=0;i<Object.keys(data).length;i++)
                      {
                        this.PaymentType.push(data[i].paymentType);
                        this.NumberOfBooking.push(data[i].numberOfBooking);
                      //  console.log(this.Bookings);
                      } 
                      if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                      this.service.statsReport.push(
                        {
                          filter: "Payment Type Analysis",
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.PaymentType,
                          statistics: this.NumberOfBooking
                        })
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
      {value: 'area', viewValue: 'Area Graph'},
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
    //   if(this.hotelLocationGraph!=null)
    //   {this.hotelLocationGraph.destroy();}
    this.loaderDisplay=false;
      this.setDataPoints(this.PaymentType,this.NumberOfBooking)

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
      showDetails(event)
      {
        alert("working");
      }
 
    }
   
  
  
