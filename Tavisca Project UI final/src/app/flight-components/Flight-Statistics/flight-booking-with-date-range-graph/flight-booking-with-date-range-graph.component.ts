import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-flight-booking-with-date-range-graph',
  templateUrl: './flight-booking-with-date-range-graph.component.html',
  styleUrls: ['./flight-booking-with-date-range-graph.component.css']
})
export class FlightBookingWithDateRangeGraphComponent implements OnInit {

  chart: string = "line";
  errorMsg: any
  Date: any=[];
  NumberOfBooking: any = [];
  graphDataPoints= [];
  id:string="flight-booking-date-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    
     //this.reRender()
    }
    reRender()
    {
      this.loaderDisplay = true;
      this.Date = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","BookingsWithinDateRange?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.Date.push(data[i].date);
                          this.NumberOfBooking.push(data[i].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: "Bookings within date range",
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: this.service.location,
                            labels: this.Date,
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
        this.setDataPoints(this.Date,this.NumberOfBooking)

        var chart = new CanvasJS.Chart(this.id, {
          zoomEnabled:true,
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", 
          title:{
            text: "Flight Booking Date Graph"
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
