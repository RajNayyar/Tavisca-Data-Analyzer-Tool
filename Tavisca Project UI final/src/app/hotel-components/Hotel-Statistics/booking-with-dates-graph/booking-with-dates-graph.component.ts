import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'booking-with-dates-graph',
  templateUrl: './booking-with-dates-graph.component.html',
  styleUrls: ['./booking-with-dates-graph.component.css']
})
export class BookingWithDatesGraphComponent implements OnInit {

  chart: string = "line";
  errorMsg: any
  BookingDates: any=[];
  NumberOfBooking: any = [];
  graphDataPoints= [];
  id:string="booking-with-dates-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    
    // this.reRender()
    }
    reRender()
    {
      this.loaderDisplay = true;
      this.BookingDates = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Hotels","BookingDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.BookingDates.push(data[i].bookingDates);
                          this.NumberOfBooking.push(data[i].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: "Booking on date range",
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: this.service.location,
                            labels: this.BookingDates,
                            statistics: this.NumberOfBooking
                          }
                        )
                        
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
        this.setDataPoints(this.BookingDates,this.NumberOfBooking)

        var chart = new CanvasJS.Chart(this.id, {
          zoomEnabled:true,
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", 
          title:{
            text: "Booking with Dates Graph"
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
      showDetails(event)
      {
        alert("working");
      }
      
   
    }
   
  
  

