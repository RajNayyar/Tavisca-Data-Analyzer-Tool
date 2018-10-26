
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GraphsServiceService } from 'src/app/service/hotel-service/graphs-service.service';
import { FlightPaymentModeComponent } from '../Flight-Statistics/flight-payment-mode/flight-payment-mode.component';
import { FlightBookingWithDateRangeGraphComponent } from '../Flight-Statistics/flight-booking-with-date-range-graph/flight-booking-with-date-range-graph.component';
import { FlightTotalBookingsGraphComponent } from '../Flight-Statistics/flight-total-bookings-graph/flight-total-bookings-graph.component';
import { MarketingAirlineGraphComponent } from '../Flight-Statistics/marketing-airline-graph/marketing-airline-graph.component';
import { FlightOriginDestinationGraphComponent } from '../Flight-Statistics/flight-origin-destination-graph/flight-origin-destination-graph.component';

import { trigger, state, style, transition, animate } from '@angular/animations';
export interface Graph {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'flight-widget',
  templateUrl: './flight-widget.component.html',
 styleUrls: ['./flight-widget.component.css'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1'
      })),
      state('closed',   style({
        opacity: '0',
        display: 'none',   
      })),
      transition('closed => open', animate('400ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class FlightWidgetComponent implements OnInit {
  isFlightNavbarCollapsed=true;
  _isFlightNavbarCollapsedAnim = 'closed';
  @HostListener('window:resize', ['$event.target']) 
onScreenResize(event) { 
  if(event.innerWidth > 600){
    
    this.showButton=false;
    this._isFlightNavbarCollapsedAnim = 'open';
      this.isFlightNavbarCollapsed = true;
  }else{
    this.showButton=true;
      this._isFlightNavbarCollapsedAnim = 'closed';
  }
}
  flightToggleNavbar(): void {
    if(this.isFlightNavbarCollapsed){
        this._isFlightNavbarCollapsedAnim = 'open';
      this.isFlightNavbarCollapsed = false;
    } else {
    this._isFlightNavbarCollapsedAnim = 'closed';
  
      this.isFlightNavbarCollapsed = true;
    }
  }
  get isFlightNavbarCollapsedAnim() : string {
    return this._isFlightNavbarCollapsedAnim;
  }
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

 showButton:boolean;
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
  this.showButton=false;
  
  this.onScreenResize(window);
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
