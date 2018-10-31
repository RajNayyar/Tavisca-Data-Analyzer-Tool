import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-marketing-airline-graph',
  templateUrl: './marketing-airline-graph.component.html',
  styleUrls: ['./marketing-airline-graph.component.css']
})
export class MarketingAirlineGraphComponent implements OnInit {
  defaultGraphType: string = "line" 
  errorMsg: any
  AirlineName: any=[];
  NumberOfBooking: any = [];
  graphDataPoints= [];
  graphName: string = "Marketing-Airline-Booking Analysis";
  id:string="marketing-airline-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
    ngOnInit(){
    this.loaderDisplay = true;
    }
    reRender()
    {
      this.AirlineName = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","MarketingAirlineBookingInfo?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var airlineBookingIndex=0;airlineBookingIndex<Object.keys(data).length;airlineBookingIndex++)
                        {
                          this.AirlineName.push(data[airlineBookingIndex].airlineName+"("+data[airlineBookingIndex].airLineCode+")");
                          this.NumberOfBooking.push(data[airlineBookingIndex].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: this.graphName,
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: "-",
                            labels: this.AirlineName,
                            statistics: this.NumberOfBooking
                          })
                          if(data.length ==0)
                          {
                            this.service.DisplayGraph( this.defaultGraphType, "No Data Found for " + this.graphName, this.AirlineName, this.NumberOfBooking, this.id);
                            this.loaderDisplay = false
                          }
                          else{
                            this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.AirlineName, this.NumberOfBooking, this.id);
                            this.loaderDisplay = false
                            }
                        
                        
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

}
