import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
  //locationServiceResponse: any;
  constructor(private http: HttpClient) { }

  httpResponseFilters(productName, filterParameters): Observable<any> {
    return this.http.get<any>('http://localhost:53783/api/'+productName+'/'+filterParameters)
                     .catch(this.errorHandler);
                     
  }
  httpEmailSending(EmailDetails):Observable<any>{
    return this.http.post('http://localhost:53783/api/EmailSender',EmailDetails)
                    .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}
