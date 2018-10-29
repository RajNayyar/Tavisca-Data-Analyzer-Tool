import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
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
     //this.reRender()
    }
    reRender()
    {
      this.AirlineName = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","MarketingAirlineBookingInfo?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.AirlineName.push(data[i].airlineName+"("+data[i].airLineCode+")");
                          this.NumberOfBooking.push(data[i].numberOfBookings);
                        }
                        debugger
                        if(data.length ==0)
                        {
                          this.graphName = "No Data Found for " + this.graphName;
           
                        }
                      
                          this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.AirlineName, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false
                        
                        
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
