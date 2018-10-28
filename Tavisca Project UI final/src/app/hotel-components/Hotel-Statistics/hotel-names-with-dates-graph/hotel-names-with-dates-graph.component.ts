import { Component, OnInit, Input } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;
import { ChartDataSets } from 'chart.js';
import * as Chart from 'chart.js';
export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'hotel-names-with-dates-graph',
  templateUrl: './hotel-names-with-dates-graph.component.html',
  styleUrls: ['./hotel-names-with-dates-graph.component.css']
})
export class HotelNamesWithDatesGraphComponent implements OnInit {

  GraphTypeValue: string
  title = 'Hotels with Dates Graph';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  HotelsAtParticularLocation: any=[];
  totalBookings: any = [];
  Place: any = [];
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  graphDataPoints= [];
  id:string="hotel-with-dates-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
  
  ngOnInit(){
    //  this.reRender()

    }
    reRender()
    {
      this.loaderDisplay=true
      this.hotelLocationGraph = null;
      this.defaultGraphType = "line";
      this.HotelsAtParticularLocation = []
      this.totalBookings= []
      this.Place= []
      this.service.httpResponseFilters("Hotels","HotelLocationWithDates?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.HotelsAtParticularLocation.push(data[i].hotelsAtParticularLocation[0]["hotelName"]+"-"+data[i].hotelsAtParticularLocation[0]["bookings"]);
                          this.totalBookings.push(data[i].totalBookings);
                          this.Place.push(data[i].place);
                       }
                       if(!this.service.statsReport.includes(this.service.statsReport.filter)){
                       this.service.statsReport.push(
                        {
                          filter: "Hotel names based on Dates",
                          startDate: this.service.start,
                          endDate: this.service.end,
                          location: this.service.location,
                          labels: this.Place,
                          statistics: this.totalBookings
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
      this.graphDataPoints = [];
      for(var i = 0; i<xAxis.length;i++)
      {
        this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
      }
      
    }
    DisplayGraph(chart ) {
      this.loaderDisplay=false
      this.setDataPoints(this.Place,this.totalBookings)

      var chart = new CanvasJS.Chart(this.id, {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "Hotel Names with Dates Graph"
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
