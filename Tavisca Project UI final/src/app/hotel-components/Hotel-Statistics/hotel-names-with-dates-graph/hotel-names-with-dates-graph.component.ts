import { Component, OnInit, Input } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;
import { ChartDataSets } from 'chart.js';
import * as Chart from 'chart.js';
export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'hotel-names-with-dates-graph',
  templateUrl: './hotel-names-with-dates-graph.component.html',
  styleUrls: ['./hotel-names-with-dates-graph.component.css']
})
export class HotelNamesWithDatesGraphComponent implements OnInit {

  defaultGraphType: string = "line" 
  errorMsg: any
  HotelsAtParticularLocation: any=[];
  totalBookings: any = [];
  Place: any = []
  graphDataPoints=[]
  loaderDisplay: boolean
  graphName: string = "Loacation-Booking analysis";
  id:string="hotel-with-dates-chart";
  
  constructor (private service:GraphsServiceService) { }

  ngOnInit(){
    this.loaderDisplay = true;
    }
    reRenderChart()
    {
      this.defaultGraphType = "line";
      this.service.httpResponseFilters("Hotels","HotelLocationWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{    
                      for(var index=0;index<Object.keys(data).length;index++)
                        {
                          this.HotelsAtParticularLocation.push(data[index].hotelsAtParticularLocation[0]["hotelName"]+"-"+data[index].hotelsAtParticularLocation[0]["bookings"]);
                          this.totalBookings.push(data[index].totalBookings);
                          this.Place.push(data[index].place);
                       }
                       if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                       this.service.statsReport.push(
                        {
                          filter: this.graphName,
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.Place,
                          statistics: this.totalBookings
                        })
                      }
                      if(data.length ==0)
                      {
                        this.graphName = "No Data Found for " + this.graphName;
                      }
                        this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.Place, this.totalBookings, this.id);
                        this.loaderDisplay = false                     
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
}
