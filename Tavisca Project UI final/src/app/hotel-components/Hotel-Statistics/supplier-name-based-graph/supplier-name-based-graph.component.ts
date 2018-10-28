import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';


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
  GraphTypeValue: string
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  SupplierName: any=[];
  NumberOfBooking: any = [];
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  
  loaderDisplay: boolean
  id:string="supplier-name-chart";
  constructor (private service:GraphsServiceService) { }
  
  ngOnInit(){
    //this.reRender()
  }
  reRender(){
    this.loaderDisplay=true
    this.hotelLocationGraph = null;
    this.defaultGraphType = "line";
    this.SupplierName = [];
    this.NumberOfBooking= [];
    this.service.httpResponseFilters("Hotels","SupplierNamesWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
              for(var i=0;i<Object.keys(data).length;i++)
                      {
                        this.SupplierName.push(data[i].supplierName);
                        this.NumberOfBooking.push(data[i].bookings);
                      }
                    if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                      this.service.statsReport.push(
                        {
                          filter: "Suppliers Analysis",
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.SupplierName,
                          statistics: this.NumberOfBooking
                        })
                      }
                     this.service.DisplayGraph( this.chart, this.SupplierName, this.NumberOfBooking, this.id);
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
      this.service.DisplayGraph( this.chart, this.SupplierName, this.NumberOfBooking, this.id);
    }

 
 
      showDetails(event)
      {
        alert("working");
      }
      
   
    }
   
  
  


