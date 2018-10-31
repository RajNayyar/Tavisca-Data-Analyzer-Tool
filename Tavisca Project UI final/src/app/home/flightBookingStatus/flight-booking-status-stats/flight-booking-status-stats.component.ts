import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;
@Component({
  selector: 'app-flight-booking-status-stats',
  templateUrl: './flight-booking-status-stats.component.html',
  styleUrls: ['./flight-booking-status-stats.component.css']
})
export class FlightBookingStatusStatsComponent implements OnInit {

  graphName:string="";
  chart: string = "doughnut";
  errorMsg: any
  bookingStatus: any=[];
  numberOfBookings: any = [];
  colors:any=[];
  count:any;
  graphDataPoints= [];
  constructor (private service:GraphsServiceService) { }
  ngOnInit() {
    this.service.httpResponseFilters("Air","TotalBookings")
      .subscribe( data=>{
                    for(var bookingStatsIndex=0;bookingStatsIndex<Object.keys(data).length;bookingStatsIndex++)
                    {           
                      if(data[bookingStatsIndex].bookingStatus=="Purchased") 
                      {
                        this.bookingStatus.push(data[bookingStatsIndex].bookingStatus);
                        this.numberOfBookings.push(data[bookingStatsIndex].numberOfBookings);
                        this.colors.push("#175b15");
                      }
                      if(data[bookingStatsIndex].bookingStatus=="Canceled")
                      {
                        this.bookingStatus.push(data[bookingStatsIndex].bookingStatus);
                        this.numberOfBookings.push(data[bookingStatsIndex].numberOfBookings);
                        this.colors.push("#d8b00d");
                      }
                      if(data[bookingStatsIndex].bookingStatus=="Planned")
                      {
                        this.bookingStatus.push(data[bookingStatsIndex].bookingStatus);
                        this.numberOfBookings.push(data[bookingStatsIndex].numberOfBookings);
                        this.colors.push("#d8350d");
                      }
                    }
                    this.DisplayGraph( this.chart,this.graphName);
                  },
                  error=>{ 
                        this.errorMsg = error;
                        if(this.errorMsg!=null)
                        {
                          this.DisplayGraph( this.chart,"Something Went Wrong! Please try again later..");
                        }  
                  }
          );
 }
 setDataPoints(xAxis, yAxis)
    {
      this.graphDataPoints = []
      for(var index = 0; index<xAxis.length;index++)
      {
        this.graphDataPoints.push({label: xAxis[index], y: yAxis[index],color:this.colors[index]});
      }
      
    }
    DisplayGraph(chart,graphName) {

      this.setDataPoints(this.bookingStatus,this.numberOfBookings)

      var chart = new CanvasJS.Chart("stats-flight", {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title:{
          fontSize: 20,
           text: graphName
         }, 
        data: [{
          type: chart,
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: this.graphDataPoints,
          click: function (e) {
          }
        }]
      });
      chart.render();
    }
}
