import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

declare var CanvasJS: any;

@Injectable({
  providedIn: 'root'
})

export class GraphsServiceService {
  //hotelLocation = {};
  location:string = "Las Vegas";
  start:string = "2015-05-15";
  end:string = "2018-05-15";
  source:string="LAX";
  destination:string="LAS";
  cancelCount:any;
  statsReport = []
  SearchParam:any;
  graphDataPoints=[]
  //locationServiceResponse: any;
  constructor(private http: HttpClient) { }

  httpResponseFilters(productName, filterParameters): Observable<any> {
    return this.http.get<any>('http://taviscadataanalyzertool.ap-south-1.elasticbeanstalk.com/api/'+productName+'/'+filterParameters)
                     .catch(this.errorHandler);
                     
  }
  httpEmailSending(EmailDetails):Observable<any>{
    return this.http.post('http://taviscadataanalyzertool.ap-south-1.elasticbeanstalk.com/api/EmailSender',EmailDetails)
                    .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


  setDataPoints(xAxis, yAxis)
  {
    this.graphDataPoints = [];
    for(var i = 0; i<xAxis.length;i++)
    {
      this.graphDataPoints.push({label: xAxis[i], y: yAxis[i]});
    }
  }
  
  DisplayGraph(chart, graphName, xAxis, yAxis, id ) {
    
   this.setDataPoints(xAxis,yAxis);

   var chart = new CanvasJS.Chart(id, {
     zoomEnabled:true,
     animationEnabled: true,
     exportEnabled: true,
     theme: "light1", 
     title:{
       text: graphName
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
 GraphSelect(graphValue, graphName, xAxis, yAxis, id)
    {
     var chart = graphValue;
     this.DisplayGraph( chart, graphName, xAxis, yAxis, id);
    }

}
