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
  selector: 'location-based-graph',
  templateUrl: './location-based-graph.component.html',
  styleUrls: ['./location-based-graph.component.css']
})
export class LocationBasedGraphComponent implements OnInit  {


  GraphTypeValue: string
  title = 'Location Based Graph';
  chart: string = "line";
  hotelLocationGraph: any;
  defaultGraphType: string
  errorMsg: any
  locations: any=[];
  NumberOfBooking: any = [];
  @Input() location: string;
  @Input() startDate: string;
  @Input() endDate: string;
  paymentStartDate: string;
  paymentEndDate: string;
  paymentLocation: string;
  defaultStartDate: string = "2015-05-15"
  defaultEndDate: string = "2018-05-15"
  defaultLocation: string = "Las Vegas"
  graphDataPoints= [];
  id:string="location-chart";
  //constructor( private http: HttpClient){}
  constructor (private service:GraphsServiceService) { }
  setDatesAndLocation()
  {
    if(this.startDate == null)
    {
      this.paymentStartDate = this.defaultStartDate
    }
    else
    {
      this.paymentStartDate = this.startDate
    }
    if(this.endDate == null)
    {
      this.paymentEndDate = this.defaultEndDate
    }
    else
    {
      this.paymentEndDate = this.endDate
    }
    if(this.location == null)
    {
      this.paymentLocation = this.defaultLocation
    }
    else
    {
      this.paymentLocation = this.location
    }
  }
  ngOnInit(){
   // this.reRender()
    }
    reRender()
    {
      this.setDatesAndLocation()
      this.hotelLocationGraph = null;
      this.defaultGraphType = "line";
      this.locations = []
      this.NumberOfBooking= []
      debugger
      this.service.httpResponseFilters("Hotels","HotelLocations")
      .subscribe( data=>{

                          this.locations=data["city"];
                          for(let val in this.locations)
                          this.NumberOfBooking.push(5);
                      this.DisplayGraph( this.chart);
                  },
          error=>{ this.errorMsg = error;}

            );
    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'Area', viewValue: 'Area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];

serviceCall(){
   this.setDatesAndLocation()
      this.hotelLocationGraph = null;
      this.defaultGraphType = "line";
      this.locations = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Hotels","HotelLocations")
      .subscribe( data=>{

                          this.locations=data["city"];
                          for(let val in this.locations)
                          this.NumberOfBooking.push(5);
                      this.DisplayGraph( this.chart);
                  },
          error=>{ this.errorMsg = error;}

            );
}
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

      this.setDataPoints(this.locations,this.NumberOfBooking)

      var chart = new CanvasJS.Chart(this.id, {
        zoomEnabled:true,
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "Location Based Graph"
        },
        data: [{
          type: chart, //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
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


