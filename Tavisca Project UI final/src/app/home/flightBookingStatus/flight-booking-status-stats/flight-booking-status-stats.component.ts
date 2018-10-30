import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;
@Component({
  selector: 'app-flight-booking-status-stats',
  templateUrl: './flight-booking-status-stats.component.html',
  styleUrls: ['./flight-booking-status-stats.component.css']
})
export class FlightBookingStatusStatsComponent implements OnInit {

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
      for(var i=0;i<Object.keys(data).length;i++)
      {           
      if(data[i].bookingStatus=="Purchased") {
        this.bookingStatus.push(data[i].bookingStatus);
          this.numberOfBookings.push(data[i].numberOfBookings);
          this.colors.push("#175b15");
      }
          if(data[i].bookingStatus=="Canceled"){
            this.bookingStatus.push(data[i].bookingStatus);
          this.numberOfBookings.push(data[i].numberOfBookings);
          this.colors.push("#d8b00d");
          }
          if(data[i].bookingStatus=="Planned"){
            this.bookingStatus.push(data[i].bookingStatus);
          this.numberOfBookings.push(data[i].numberOfBookings);
          this.colors.push("#d8350d");
          }
        }
                     this.DisplayGraph( this.chart);
                },
        error=>{ this.errorMsg = error;}

          );
 }
 setDataPoints(xAxis, yAxis)
    {
      this.graphDataPoints = []
      for(var i = 0; i<xAxis.length;i++)
      {
        this.graphDataPoints.push({label: xAxis[i], y: yAxis[i],color:this.colors[i]});
      }
      
    }
    DisplayGraph(chart ) {

      this.setDataPoints(this.bookingStatus,this.numberOfBookings)

      var chart = new CanvasJS.Chart("stats-flight", {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", 
      
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
