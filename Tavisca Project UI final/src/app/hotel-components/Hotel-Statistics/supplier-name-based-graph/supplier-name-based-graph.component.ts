import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'supplier-name-based-graph',
  templateUrl: './supplier-name-based-graph.component.html',
  styleUrls: ['./supplier-name-based-graph.component.css']
})
export class SupplierNameBasedGraphComponent implements OnInit
{
  defaultGraphType: string = "line" 
  errorMsg: any
  SupplierName: any=[];
  NumberOfBooking: any = [];
  graphDataPoints=[]
  loaderDisplay: boolean
  id:string = "supplier-name-chart";
  graphName: string = "Supplier-Booking Analysis";
  constructor (private service:GraphsServiceService) { }
  
  ngOnInit(){
    this.loaderDisplay = true;
   }
   reRenderChart() {
    this.loaderDisplay=true
    this.SupplierName = [];
    this.NumberOfBooking= [];
    this.service.httpResponseFilters("Hotels","SupplierNamesWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
                    for(var index=0;index<Object.keys(data).length;index++) {
                        this.SupplierName.push(data[index].supplierName);
                        this.NumberOfBooking.push(data[index].bookings);
                    }
                    if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                      this.service.statsReport.push(
                        {
                          filter: this.graphName,
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.SupplierName,
                          statistics: this.NumberOfBooking
                        })
                      }
                      if(data.length ==0) {
                        this.graphName = "No Data Found for " + this.graphName;
                      }
                        this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.SupplierName, this.NumberOfBooking, this.id);
                        this.loaderDisplay = false                   
                },
                error=>{ 
                  this.errorMsg = error;
                  if(this.errorMsg!=null)
                  {
                    this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later..", this.SupplierName, this.NumberOfBooking, this.id);
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
   
  
  


