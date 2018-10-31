import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-flight-total-bookings-graph',
  templateUrl: './flight-total-bookings-graph.component.html',
  styleUrls: ['./flight-total-bookings-graph.component.css']
})
export class FlightTotalBookingsGraphComponent implements OnInit {
  defaultGraphType: string = "line" 
  errorMsg: any
  BookingStatus: any=["Failure","Success","Cancelled"];
  NumberOfBooking: any = [];
  graphName: string = "Status-Booking Analysis";
  id:string="total-bookings-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
    ngOnInit(){
    this.loaderDisplay = true;
    }
    reRender()
    {
      this.BookingStatus = ["Failure","Success","Cancelled"]
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","TotalBookings")
      .subscribe( data=>{
              
                      for(var TotalBookingsIndex=0;TotalBookingsIndex<Object.keys(data).length;TotalBookingsIndex++)
                        {
                          this.NumberOfBooking.push(data[TotalBookingsIndex].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: this.graphName,
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: "-",
                            labels: this.BookingStatus,
                            statistics: this.NumberOfBooking
                          })
                          if(data.length ==0)
                          {
                            this.service.DisplayGraph( this.defaultGraphType, "No Data Found for " + this.graphName, this.BookingStatus, this.NumberOfBooking, this.id);
                            this.loaderDisplay = false
                          }
                          else{
                            this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.BookingStatus, this.NumberOfBooking, this.id);
                            this.loaderDisplay = false
                            }
                        
                  },
                  error=>{ 
                    this.errorMsg = error;
                    if(this.errorMsg!=null)
                    {
                      this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later..", this.BookingStatus, this.NumberOfBooking, this.id);
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
