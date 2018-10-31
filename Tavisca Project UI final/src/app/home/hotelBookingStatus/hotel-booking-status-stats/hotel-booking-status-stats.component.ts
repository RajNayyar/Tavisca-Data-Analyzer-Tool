import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;
@Component({
  selector: 'app-hotel-booking-status-stats',
  templateUrl: './hotel-booking-status-stats.component.html',
  styleUrls: ['./hotel-booking-status-stats.component.css']
})
export class HotelBookingStatusStatsComponent implements OnInit {
  graphName:string="";
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
      for(var hotelbookingStataIndex=0;hotelbookingStataIndex<Object.keys(data).length;hotelbookingStataIndex++)
      {           
        if(data[hotelbookingStataIndex].type=="Purchased") 
        {
          this.bookingStatus.push(data[hotelbookingStataIndex].type);
          this.numberOfBookings.push(data[hotelbookingStataIndex].count);
          this.colors.push("#175b15");
        }
        if(data[hotelbookingStataIndex].type=="Canceled")
        {
          this.bookingStatus.push(data[hotelbookingStataIndex].type);
          this.numberOfBookings.push(data[hotelbookingStataIndex].count);
          this.colors.push("#d8b00d");
        }
        if(data[hotelbookingStataIndex].type=="Planned")
        {
          this.bookingStatus.push(data[hotelbookingStataIndex].type);
          this.numberOfBookings.push(data[hotelbookingStataIndex].count);
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
    setDataPoints(xAxis, yAxis) {
      this.graphDataPoints = []
      for(var index = 0; index<xAxis.length;index++)
      {
        this.graphDataPoints.push({label: xAxis[index], y: yAxis[index],color:this.colors[index]});
      } 
    }
    DisplayGraph(chart,graphName ) {
      this.setDataPoints(this.bookingStatus,this.numberOfBookings)
      var chart = new CanvasJS.Chart("stats-hotel", {
        backgroundColor: "transparent",
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
          //  alert(e.dataPoint.y +" "+e.dataPoint.label)
          }
        }]
      });
      chart.render();
    }
}
