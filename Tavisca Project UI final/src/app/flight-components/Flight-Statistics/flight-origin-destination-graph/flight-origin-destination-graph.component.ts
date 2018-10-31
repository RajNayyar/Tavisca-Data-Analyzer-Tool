import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightWidgetComponent } from '../../flight-widget/flight-widget.component';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-flight-origin-destination-graph',
  templateUrl: './flight-origin-destination-graph.component.html',
  styleUrls: ['./flight-origin-destination-graph.component.css']
})
export class FlightOriginDestinationGraphComponent implements OnInit {
  defaultGraphType: string = "line" 
  errorMsg: any
  NumberOfBooking: any = [];
  AirlineName: any = []
  graphName: string = "Origin-Destination Booking Analysis";
  id:string="origin-destination-chart";
  loaderDisplay: boolean
  sourceTerm:any;
  destinationTerm:any;
  response:any;
  res:any [];
  src:any;
  dest:any;
  sourceDestinationForm:FormGroup;
  constructor (private service:GraphsServiceService,private fb:FormBuilder) { 
    this.service.httpResponseFilters("Air","ListOfAirportsWithCode")
    .subscribe( data=>{ 
      this.response = data;
        this.res = data["airportNameWithCode"]; 
                        },
                error=>{ this.errorMsg = error;});

  }
 
  ngOnInit(){
    this.sourceDestinationForm=this.fb.group({
      'sourceControl':[null,[Validators.required]],
      'destinationControl':[null,[Validators.required]]
    });
    this.loaderDisplay = true;
     //this.reRender()
    }
    deleteFromStatsReportIfExists()
    {
      for(var index=0;index<this.service.statsReport.length; index++)
      {
        if(this.service.statsReport[index].filter==this.graphName)
        {
          this.service.statsReport.splice(index,1)
        }
      }
    }
    AirportCheck(){
      if(this.sourceTerm!=null) {
        this.src=this.sourceTerm.split("-");
        this.sourceTerm=this.src[1];
        
      this.service.source=this.sourceTerm;
      }
      if(this.destinationTerm!=null) {
        this.dest=this.destinationTerm.split("-");
        this.destinationTerm=this.dest[1];
      this.deleteFromStatsReportIfExists() 
      this.service.destination=this.destinationTerm;
      
      }
     this.reRender()
    }
    reRender()
    {
      this.AirlineName = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","BookingsForSpecificTrip?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000&departAirportCode="+this.service.source+"&arrivalAirportCode="+this.service.destination)
      .subscribe( data=>{
              
                      for(var i=0;i<Object.keys(data).length;i++)
                        {
                          this.AirlineName.push(data[i].airlineName);
                          this.NumberOfBooking.push(data[i].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: this.graphName,
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: this.service.source + " to " + this.service.destination,
                            labels: this.AirlineName,
                            statistics: this.NumberOfBooking
                          })
                        if(data.length ==0)
                        {
                          this.service.DisplayGraph( this.defaultGraphType, "No Data Found for " + this.graphName + " for: "+ this.service.source + " to " + this.service.destination , this.AirlineName, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false        
                        }
                        else
                        {
                          this.service.DisplayGraph( this.defaultGraphType, this.graphName + " for: "+ this.service.source + " to " + this.service.destination , this.AirlineName, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false
                        }
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

    
      private _markAsDirty2(group:FormGroup){
        group.markAsDirty();
        for(let i in group.controls){
          group.controls[i].markAsDirty();
        }
      }
}
