import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-flight-booking-with-date-range-graph',
  templateUrl: './flight-booking-with-date-range-graph.component.html',
  styleUrls: ['./flight-booking-with-date-range-graph.component.css']
})
export class FlightBookingWithDateRangeGraphComponent implements OnInit {

  defaultGraphType: string = "line" 
  errorMsg: any
  NumberOfBooking: any = [];
  Date: any = []
  graphName: string = "Date-Booking Analysis";
  id:string="flight-booking-date-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    this.loaderDisplay = true;
    }
    reRender()
    {
      this.Date = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","BookingsWithinDateRange?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var dateRangeIndex=0;dateRangeIndex<Object.keys(data).length;dateRangeIndex++)
                        {
                          this.Date.push(data[dateRangeIndex].date);
                          this.NumberOfBooking.push(data[dateRangeIndex].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: this.graphName,
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: "-",
                            labels: this.Date,
                            statistics: this.NumberOfBooking
                          })
                        if(data.length == 0)
                        {
                          this.service.DisplayGraph( this.defaultGraphType, "No Data Found for " + this.graphName, this.Date, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false;
                        }
                        else
                        {
                          this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.Date, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false; 
                        }
                  },
                  error=>{ 
                      this.errorMsg = error;
                      if(this.errorMsg!=null)
                      {
                        this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later.." , this.Date, this.NumberOfBooking, this.id);
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
