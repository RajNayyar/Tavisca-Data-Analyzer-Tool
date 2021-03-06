import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
import { debug } from 'util';
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

  defaultGraphType: string = "line" 
  errorMsg: any
  paymentType: any=[];
  numberOfBooking: any = [];
  graphDataPoints=[]
  loaderDisplay: boolean
  id:string = "payment-mode-chart";
  graphName: string = "Mode of Payment Analysis";
  constructor (private service:GraphsServiceService) {}

  ngOnInit(){
    this.loaderDisplay = true;
    }
    reRenderChart()
    {
    this.loaderDisplay=true
    this.defaultGraphType = "line";
    this.paymentType = []
    this.numberOfBooking= []
       this.service.httpResponseFilters("Hotels","PaymentType?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
                    for(var index=0;index<Object.keys(data).length;index++)
                      {
                        this.paymentType.push(data[index].paymentType);
                        this.numberOfBooking.push(data[index].numberOfBooking);
                      } 
                      if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                      this.service.statsReport.push(
                        {
                          filter: this.graphName,
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.paymentType,
                          statistics: this.numberOfBooking
                        })
                      }
                      if(data.length ==0)
                      {
                        this.graphName = "No Data Found for " + this.graphName;
                      }
                        this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.paymentType, this.numberOfBooking, this.id);
                        this.loaderDisplay = false
                },
                error=>{ 
                  this.errorMsg = error;
                  if(this.errorMsg!=null)
                  {
                    this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later..", this.paymentType, this.numberOfBooking, this.id);
                    this.loaderDisplay = false;
                  }
                }       
          );
    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'area', viewValue: 'Area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];
    }
   
  
  
