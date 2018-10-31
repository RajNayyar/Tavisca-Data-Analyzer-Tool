import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;
@Component({
  selector: 'app-hotel-booking-status-stats',
  templateUrl: './hotel-booking-status-stats.component.html',
  styleUrls: ['./hotel-booking-status-stats.component.css']
})
export class HotelBookingStatusStatsComponent implements OnInit {
  chart: string = "doughnut";
  errorMsg: any
  bookingStatus: any=[];
  numberOfBookings: any = [];
  colors:any=[];
  count:any;
  graphDataPoints= [];
  id:string="booking-with-dates-chart";
  constructor (private service:GraphsServiceService) { }
  ngOnInit() {
   
    this.service.httpResponseFilters("Hotels","TotalBookings")
    .subscribe( data=>{
      for(var i=0;i<Object.keys(data).length;i++)
      {           
      if(data[i].type=="Purchased") {
        this.bookingStatus.push(data[i].type);
          this.numberOfBookings.push(data[i].count);
          this.colors.push("#175b15");
      }
          if(data[i].type=="Canceled"){
            this.bookingStatus.push(data[i].type);
          this.numberOfBookings.push(data[i].count);
          this.colors.push("#d8b00d");
          }
          if(data[i].type=="Planned"){
            this.bookingStatus.push(data[i].type);
          this.numberOfBookings.push(data[i].count);
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
