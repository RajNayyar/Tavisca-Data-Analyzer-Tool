import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

 
  errorMsg: any;
  successCount: any;

 // defaultStartDate: string = "2015-02-15"
  //defaultEndDate: string = "2018-05-25";
  //defaultLocation: string = "Las Vegas"
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit() {
  
    this.service.httpResponseFilters("Hotels","TotalBookings")
    .subscribe( data=>{
      this.successCount=data[1].count;
                },
        error=>{ this.errorMsg = error;}

          );
  }

}
