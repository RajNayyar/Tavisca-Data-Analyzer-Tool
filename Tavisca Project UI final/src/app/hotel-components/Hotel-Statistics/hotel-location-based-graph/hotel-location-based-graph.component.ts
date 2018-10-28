import { Component, OnInit, Input } from '@angular/core';
import {Chart, ChartDataSets, ChartArea} from 'chart.js';
import {  GraphsServiceService } from '../../../service/hotel-service/graphs-service.service';
declare var CanvasJS: any;
import 'hammerjs';


export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'hotel-location-based-graph',
  templateUrl: './hotel-location-based-graph.component.html',
  styleUrls: ['./hotel-location-based-graph.component.css']
})
export class HotelLocationBasedGraphComponent implements OnInit  {

  chart: string = "line";
  errorMsg: any
  Hotels: any=[];
  Bookings: any = [];
  graphDataPoints= [];
  id:string="booking-with-dates-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    //  this.reRender();
    }
    async reRender(){
      this.loaderDisplay=true
    this.Bookings = []
    this.Hotels = []
    await this.service.httpResponseFilters("Hotels","HotelNamesWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&location="+this.service.location)
    .subscribe( data=>{
                    for(var i=0;i<Object.keys(data).length;i++)
                      {
                        this.Bookings.push(data[i].bookings);
                        this.Hotels.push(data[i].hotelName);
                      //  console.log(this.Bookings);
                      }
                      if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                      this.service.statsReport.push(
                        {
                          filter: "Hotel based on location",
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.Hotels,
                          statistics: this.Bookings
                        })
                      }
                     this.DisplayGraph( this.chart);
                },
        error=>{ this.errorMsg = error;}

          );
    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'area', viewValue: 'Area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];


    GraphSelect(graphValue)
    {
      this.chart = graphValue;
     this.DisplayGraph(this.chart);
    }


    setDataPoints(xAxis, yAxis)
    {
      this.graphDataPoints = []
      for(var i = 0; i<xAxis.length;i++)
      {
        this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
      }
      
    }
    DisplayGraph(chart ) {
      this.loaderDisplay=false;
      this.setDataPoints(this.Hotels,this.Bookings)

      var chart = new CanvasJS.Chart("hotel-location-chart", {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", 
        title:{
          text: "Hotel Location Graph"
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
