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
  location:string = "Las Vegas";
  start:string = "2015-05-15";
  end:string = "2018-05-15";
  source:string="LAX";
  destination:string="LAS";
  cancelCount:any;
  statsReport = []
  SearchParam:any;
  graphDataPoints=[]
  constructor(private http: HttpClient) { }

  httpResponseFilters(productName, filterParameters): Observable<any> {
    return this.http.get<any>('http://taviscadataanalyzertool.ap-south-1.elasticbeanstalk.com/api/'+productName+'/'+filterParameters)
                     .catch(this.errorHandler);
                     
  }
  httpEmailSending(EmailDetails):Observable<any> {
    return this.http.post('http://taviscadataanalyzertool.ap-south-1.elasticbeanstalk.com/api/EmailSender',EmailDetails)
                    .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
  setDataPoints(xAxis, yAxis)
  {
    this.graphDataPoints = [];
    for(var dataIndex = 0; dataIndex<xAxis.length;dataIndex++)
    {
      this.graphDataPoints.push({label: xAxis[dataIndex], y: yAxis[dataIndex]});
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
      fontSize: 20,
       text: graphName
     },
     data: [{
       type: chart,
       indexLabelFontColor: "#5A5757",
       indexLabelPlacement: "outside",
       dataPoints: this.graphDataPoints,
       click: function (e) {
         
       }
     }]
   });
   chart.render();
 }
  GraphSelect(graphValue, graphName, id) {
    for(var reportIndex = 0; reportIndex< this.statsReport.length;reportIndex++) {
        console.log(this.statsReport[reportIndex].filter)
        if(this.statsReport[reportIndex].filter == graphName) {
            this.DisplayGraph(graphValue, graphName, this.statsReport[reportIndex].labels, this.statsReport[reportIndex].statistics, id)
            break
      }
    }
  }
  dateFormatter(yourDate)
{
   var currentDate = yourDate.toString()
   var dd: string = "";
   var mm: string = "";
   var yyyy: string = "";
   var formattedDate: string;
   var flag: number= 0;
   for(var dateIndex = 0; dateIndex< currentDate.length; dateIndex++)
   {
      if(currentDate[dateIndex]=="/")
      {
        flag = flag +1;
      }
     else if(flag ==0)
      {
        mm = mm + currentDate[dateIndex];
      }
      else if(flag ==1)
      {
        dd = dd + currentDate[dateIndex];
      }
      else if(flag ==2)
      {
        yyyy = yyyy + currentDate[dateIndex];
      }
    } 
      formattedDate = yyyy+"-"+mm+"-"+dd;
      return formattedDate ;    
   }
}
