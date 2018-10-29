import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-marketing-airline-graph',
  templateUrl: './marketing-airline-graph.component.html',
  styleUrls: ['./marketing-airline-graph.component.css']
})
export class MarketingAirlineGraphComponent implements OnInit {

 
  chart: string = "line";
  errorMsg: any
  AirlineName: any=[];
  NumberOfBooking: any = [];
  graphDataPoints= [];
  id:string="marketing-airline-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    
   //  this.reRender()
    }
    reRender()
    {
      this.loaderDisplay = true;
      this.AirlineName = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","MarketingAirlineBookingInfo?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.AirlineName.push(data[i].airlineName+"("+data[i].airLineCode+")");
                          this.NumberOfBooking.push(data[i].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: "Marketing Airline Booking",
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: this.service.location,
                            labels: this.AirlineName,
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
        this.setDataPoints(this.AirlineName,this.NumberOfBooking)

        var chart = new CanvasJS.Chart(this.id, {
          zoomEnabled:true,
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", 
          title:{
            text: "Marketing Airline Graph"
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
