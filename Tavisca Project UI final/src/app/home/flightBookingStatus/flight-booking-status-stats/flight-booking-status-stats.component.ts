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
  bookingStatus: any=["Success","Failure","Cancelled"];
  numberOfBookings: any = [];
  colors:any=["#175b15","#d8350d","#d8b00d"];
  count:any;
  graphDataPoints= [];
  constructor (private service:GraphsServiceService) { }
  ngOnInit() {
   
    this.service.httpResponseFilters("Air","TotalBookings")
    .subscribe( data=>{
                   
                        this.numberOfBookings.push(data[1].numberOfBookings);
                        this.numberOfBookings.push(data[0].numberOfBookings);
                        this.numberOfBookings.push(data[2].numberOfBookings);
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
            //alert(e.dataPoint.y +" "+e.dataPoint.label)
          }
        }]
      });
      chart.render();
    }
}
