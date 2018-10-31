import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
declare var CanvasJS: any;

export interface GraphTypes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-flight-payment-mode',
  templateUrl: './flight-payment-mode.component.html',
  styleUrls: ['./flight-payment-mode.component.css']
})
export class FlightPaymentModeComponent implements OnInit {

  defaultGraphType: string = "line" 
  errorMsg: any
  NumberOfBooking: any = [];
  paymentType: any = []
  graphName: string = "Payment Mode Analysis";
  id:string="flight-payment-mode-chart";
  loaderDisplay: boolean
  constructor (private service:GraphsServiceService) { }
 
  ngOnInit(){
    this.loaderDisplay = true;
     //this.reRender()
    }
    reRender()
    {
      this.paymentType = []
      this.NumberOfBooking= []

      this.service.httpResponseFilters("Air","PaymentType?fromDate="+ this.service.start +" 00:00:00.000&toDate="+this.service.end+" 00:00:00.000")
      .subscribe( data=>{
              
                      for(var paymentModeIndex=0;paymentModeIndex<Object.keys(data).length;paymentModeIndex++)
                        {
                          this.paymentType.push(data[paymentModeIndex].paymentType);
                          this.NumberOfBooking.push(data[paymentModeIndex].numberOfBookings);
                        }
                        this.service.statsReport.push(
                          {
                            filter: this.graphName,
                            startDate: this.service.start,
                            endDate: this.service.end,
                            location: "-",
                            labels: this.paymentType,
                            statistics: this.NumberOfBooking
                          })
                        if(data.length ==0)
                        {
                          this.service.DisplayGraph( this.defaultGraphType, "No Data Found for " + this.graphName, this.paymentType, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false
                        }
                        else{
                          this.service.DisplayGraph( this.defaultGraphType, this.graphName, this.paymentType, this.NumberOfBooking, this.id);
                          this.loaderDisplay = false
                          }
                        
                  },
                  error=>{ 
                    this.errorMsg = error;
                    if(this.errorMsg!=null)
                    {
                      this.service.DisplayGraph( this.defaultGraphType, "Something Went wrong! Please Try again later..", this.paymentType, this.NumberOfBooking, this.id);
                      this.loaderDisplay = false;
                    }
                  }
            );

    }
    graphs: GraphTypes[] = [
      {value: 'bar', viewValue: 'Bar Graph'},
      {value: 'pie', viewValue: 'Pie Graph'},
      {value: 'line', viewValue: 'Line Graph'},
      {value: 'area', viewValue: 'area Graph'},
      {value: 'doughnut', viewValue: 'Doughnut Graph'}
    ];

   
 
}
