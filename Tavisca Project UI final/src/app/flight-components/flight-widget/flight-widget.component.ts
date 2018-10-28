import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
import { FlightPaymentModeComponent } from '../Flight-Statistics/flight-payment-mode/flight-payment-mode.component';
import { FlightBookingWithDateRangeGraphComponent } from '../Flight-Statistics/flight-booking-with-date-range-graph/flight-booking-with-date-range-graph.component';
import { FlightTotalBookingsGraphComponent } from '../Flight-Statistics/flight-total-bookings-graph/flight-total-bookings-graph.component';
import { MarketingAirlineGraphComponent } from '../Flight-Statistics/marketing-airline-graph/marketing-airline-graph.component';
import { FlightOriginDestinationGraphComponent } from '../Flight-Statistics/flight-origin-destination-graph/flight-origin-destination-graph.component';
export interface Graph {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'flight-widget',
  templateUrl: './flight-widget.component.html',
  styleUrls: ['./flight-widget.component.css']
})
export class FlightWidgetComponent implements OnInit {
 
  flightPaymentMode = new  FlightPaymentModeComponent(this.service)
  marketingAirline = new MarketingAirlineGraphComponent(this.service)
  flightTotalBookings = new FlightTotalBookingsGraphComponent(this.service)
  bookingWithDates = new FlightBookingWithDateRangeGraphComponent(this.service)
  originDestination = new FlightOriginDestinationGraphComponent(this.service,this.fb)
currentStartDate:Date;
 currentEndDate:Date=new Date();
 flightEndDate:string;
 flightStartDate: string;
 selectedValue:string;
 minDate = new Date(2016, 0, 1);
 maxDate = new Date();
 startDate:Date=null;
 location:any;
 ids:any;
 IsVisible:boolean=true;
 searchTerm:any;
 checkValue:Array<string>=['place', 'marketingAirline', 'bookDate', 'allBookings', 'paymentMode'];


  graphs: Graph[] = [
    {value: 'place', viewValue: 'Origin and Destination Scenario'},
    {value: 'marketingAirline', viewValue: 'Marketing Airline'},
    {value: 'bookDate', viewValue: 'Booking With Date Range'},
    {value: 'allBookings', viewValue: 'Total Bookings'},
    {value: 'paymentMode', viewValue: 'Payment Mode'}
  ];
  response:any;
  res:any [];
  errorMsg:any;
  flightInputForm:FormGroup;
  constructor(private fb:FormBuilder, private service:GraphsServiceService ){
}

ngOnInit() {
  this.ServiceCalls()
  this.flightInputForm=this.fb.group({
    'startDateControl':[null,[Validators.required]],
    'endDateControl':[null,[Validators.required]]
  });

}
ServiceCalls()
{

  if(this.checkValue.includes('paymentMode'))
  { 
    this.flightPaymentMode.reRender();
  }
   if(this.checkValue.includes ('marketingAirline'))
   {
     this.marketingAirline.reRender();}
 if(this.checkValue.includes('allBookings'))
   { this.flightTotalBookings.reRender();}
   if(this.checkValue.includes('bookDate'))
  { this.bookingWithDates.reRender();}
   if(this.checkValue.includes('place'))
   { this.originDestination.reRender();}

}
checkStartDate(){
  this.IsVisible=false;
}
dataAnalysis(startDate, endDate,checkVal){
    
  this._markAsDirty(this.flightInputForm);
  this.flightEndDate = endDate.toString();
  this.checkValue=checkVal;
  this.flightStartDate = startDate.toString();
  this.flightEndDate = this.dateFormatter(this.flightEndDate)
  this.flightStartDate = this.dateFormatter(this.flightStartDate)
  this.service.start=this.flightStartDate;
  this.service.end=this.flightEndDate;
   this.ServiceCalls()
}
dateFormatter(yourDate)
{
   var currentDate = yourDate.toString()
   var dd: string = "";
   var mm: string = "";
   var yyyy: string = "";
   var formattedDate: string;
   var flag: number= 0;

   for(var i = 0; i< currentDate.length; i++)
   {
      if(currentDate[i]=="/")
      {
        flag = flag +1;
      }
     else if(flag ==0)
      {
        mm = mm + currentDate[i];
      }
      else if(flag ==1)
      {
        dd = dd + currentDate[i];
      }
      else if(flag ==2)
      {
        yyyy = yyyy + currentDate[i];
      }
    } 
      formattedDate = yyyy+"-"+mm+"-"+dd;
      return formattedDate ;    
   }
private _markAsDirty(group:FormGroup){
  group.markAsDirty();
  for(let i in group.controls){
    group.controls[i].markAsDirty();
  }
}
}
