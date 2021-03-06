import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'booking-with-dates-graph',
  templateUrl: './booking-with-dates-graph.component.html',
  styleUrls: ['./booking-with-dates-graph.component.css']
})
export class BookingWithDatesGraphComponent implements OnInit {

  defaultGraphType: string = "line" 
  errorMsg: any
  NumberOfBooking: any = [];
  BookingDates: any = []
  graphDataPoints=[]
  graphName: string = "Dates-Booking analysis";
  id:string="booking-with-dates-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    this.loaderDisplay = true;
    }
    reRenderChart()
    {
      this.BookingDates = []
      this.NumberOfBooking= []
      this.service.httpResponseFilters("Hotels","BookingDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
      .subscribe( data=>{
                      for(var index=0;index<Object.keys(data).length;index++)
                        {
                          this.BookingDates.push(data[index].bookingDates);
                          this.NumberOfBooking.push(data[index].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: this.graphName,
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: this.service.location,
                            labels: this.BookingDates,
                            statistics: this.NumberOfBooking
                          }
                        )
                        if(data.length ==0)
                        {
                          this.graphName = "No Data Found for " + this.graphName;
                        }
                          this.loaderDisplay = false
                          this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.BookingDates, this.NumberOfBooking, this.id);                      
                  },
                  error=>{ 
                    this.errorMsg = error;
                    if(this.errorMsg!=null)
                    {
                      this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later..", this.BookingDates, this.NumberOfBooking, this.id);
                      this.loaderDisplay = false;
                    }
                  }
            );
    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'area', viewValue: 'area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];
    }
   
  
  

