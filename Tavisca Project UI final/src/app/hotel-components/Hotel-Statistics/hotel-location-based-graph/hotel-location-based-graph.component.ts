import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import {  GraphsServiceService } from '../../../service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;
import 'hammerjs';


export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'hotel-location-based-graph',
  templateUrl: './hotel-location-based-graph.component.html',
  styleUrls: ['./hotel-location-based-graph.component.css']
})
export class HotelLocationBasedGraphComponent implements OnInit  {

  defaultGraphType: string = "line" 
  errorMsg: any
  Bookings: any = [];
  Hotels: any = []
  graphDataPoints=[]
  graphName: string = "Hotel-Booking analysis";
  id:string="hotel-location-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    this.loaderDisplay = true;
   }
    reRenderChart(){
    this.Bookings = []
    this.Hotels = []
    this.service.httpResponseFilters("Hotels","HotelNamesWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
                    for(var index=0;index<Object.keys(data).length;index++)
                      {
                        this.Bookings.push(data[index].bookings);
                        this.Hotels.push(data[index].hotelName);
                      }
                      if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                      this.service.statsReport.push(
                        {
                          filter: this.graphName,
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.Hotels,
                          statistics: this.Bookings
                        })
                      }
                      if(data.length ==0)
                      {
                        this.graphName = "No Data Found for " + this.graphName;
                      }
                        this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.Hotels, this.Bookings, this.id);
                        this.loaderDisplay = false
                },
                error=>{ 
                  this.errorMsg = error;
                  if(this.errorMsg!=null)
                  {
                    this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later..", this.Hotels, this.Bookings, this.id);
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
