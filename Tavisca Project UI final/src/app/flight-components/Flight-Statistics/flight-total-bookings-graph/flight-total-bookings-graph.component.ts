import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
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


  chart: string = "line";
  errorMsg: any
  BookingStatus: any=["Failure","Success","Cancelled"];
  NumberOfBooking: any = [];
  graphDataPoints= [];
  id:string="total-bookings-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    
   //  this.reRender()
    }
    reRender()
    {
      this.loaderDisplay = true;
      this.BookingStatus = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","TotalBookings")
      .subscribe( data=>{
              
        for(var i=0;i<Object.keys(data).length;i++)
        {           
        if(data[i].bookingStatus=="Purchased") {
          this.BookingStatus.push(data[i].bookingStatus);
            this.NumberOfBooking.push(data[i].numberOfBookings);
        }
            if(data[i].bookingStatus=="Canceled"){
              this.BookingStatus.push(data[i].bookingStatus);
            this.NumberOfBooking.push(data[i].numberOfBookings);
            }
            if(data[i].bookingStatus=="Planned"){
              this.BookingStatus.push(data[i].bookingStatus);
            this.NumberOfBooking.push(data[i].numberOfBookings);
            }
          }
                        this.service.statsReport.push(
                          {
                            filter: "Total Bookings",
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: this.service.location,
                            labels: this.BookingStatus,
                            statistics: this.NumberOfBooking
                          });
                        this.DisplayGraph( this.chart);
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

    GraphSelect(graphValue)
    {
      this.chart = graphValue;
      this.DisplayGraph(this.chart);
    }

      setDataPoints(xAxis, yAxis)
      {
        this.graphDataPoints = [];
        for(var i = 0; i<xAxis.length;i++)
        {
          this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
        }
        
      }
      DisplayGraph(chart ) {
        this.loaderDisplay = false;
        this.setDataPoints(this.BookingStatus,this.NumberOfBooking)

        var chart = new CanvasJS.Chart(this.id, {
          zoomEnabled:true,
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", 
          title:{
            text: "Total Bookings Graph"
          },
          data: [{
            type: chart, 
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: this.graphDataPoints,
            click: function (e) {
              alert(e.dataPoint.y +" "+e.dataPoint.label)
            }
          }]
        });
        chart.render();
      }
}
