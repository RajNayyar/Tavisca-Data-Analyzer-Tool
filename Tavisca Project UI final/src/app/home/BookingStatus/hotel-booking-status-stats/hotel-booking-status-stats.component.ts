import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;
@Component({
  selector: 'app-hotel-booking-status-stats',
  templateUrl: './hotel-booking-status-stats.component.html',
  styleUrls: ['./hotel-booking-status-stats.component.css']
})
export class HotelBookingStatusStatsComponent implements OnInit {
  chart: string = "doughnut";
  errorMsg: any
  bookingStatus: any=["Success","Failure","Cancelled"];
  numberOfBookings: any = [];
  colors:any=["#175b15","#d8350d","#d8b00d"];
  count:any;
  graphDataPoints= [];
  id:string="booking-with-dates-chart";
  constructor (private service:GraphsServiceService) { }
  ngOnInit() {
   
    this.service.httpResponseFilters("Hotels","TotalBookings")
    .subscribe( data=>{
                   
                        this.numberOfBookings.push(data[1].count);
                        this.numberOfBookings.push(data[0].count);
                        this.numberOfBookings.push(data[3].count);
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

      var chart = new CanvasJS.Chart("stats-hotel", {
        backgroundColor: "transparent",
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", 
        data: [{
          type: chart,
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: this.graphDataPoints,
          click: function (e) {
          //  alert(e.dataPoint.y +" "+e.dataPoint.label)
          }
        }]
      });
      chart.render();
    }
  
}
