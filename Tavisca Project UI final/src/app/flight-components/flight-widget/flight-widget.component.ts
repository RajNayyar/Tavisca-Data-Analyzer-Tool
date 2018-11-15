
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GraphsServiceService } from 'src/app/service/data-analytical-service/graphs-service.service';
import { FlightPaymentModeComponent } from '../Flight-Statistics/flight-payment-mode/flight-payment-mode.component';
import { FlightBookingWithDateRangeGraphComponent } from '../Flight-Statistics/flight-booking-with-date-range-graph/flight-booking-with-date-range-graph.component';
import { FlightTotalBookingsGraphComponent } from '../Flight-Statistics/flight-total-bookings-graph/flight-total-bookings-graph.component';
import { MarketingAirlineGraphComponent } from '../Flight-Statistics/marketing-airline-graph/marketing-airline-graph.component';
import { FlightOriginDestinationGraphComponent } from '../Flight-Statistics/flight-origin-destination-graph/flight-origin-destination-graph.component';
import { MatSnackBar} from '@angular/material';
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
  if(event.innerWidth > 1360){
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
  minDate = new Date(2014, 0, 1);
  maxDate = new Date();
  startDate:Date=null;
  location:any;
  ids:any;
  message:string="Drag Left/Right on the Graph To Zoom it"
  action:string="Close"
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
  errorMsg:any;
  flightInputForm:FormGroup;
  constructor(private fb:FormBuilder, private service:GraphsServiceService,public snackBar: MatSnackBar ){
    this.snackBar.open(this.message, this.action, {
      duration:5000,
      panelClass: ['snackbar'],
      verticalPosition: 'top',
      horizontalPosition:'center'
    }); 
}

ngOnInit() {
  this.service.statsReport = [];
  this.service.source = "LAX";
  this.service.destination="LAS";
  this.service.start = "2015-05-15";
  this.service.end = "2018-05-15";
  this.ServiceCalls();
  this.showButton=false;
  this.onScreenResize(window);
  this.flightInputForm=this.fb.group({
    'startDateControl':[null,[Validators.required]],
    'endDateControl':[null,[Validators.required]],
    'flightFilterControl':[null,[Validators.required]]
  });

}
ServiceCalls()
{
  if(this.checkValue.includes('paymentMode')) { 
    this.flightPaymentMode.reRender();
  }
  if(this.checkValue.includes ('marketingAirline')) {
    this.marketingAirline.reRender();
  }
  if(this.checkValue.includes('allBookings')){ 
    this.flightTotalBookings.reRender();
  }
  if(this.checkValue.includes('bookDate')) { 
    this.bookingWithDates.reRender();
  }
  if(this.checkValue.includes('place')){ 
    this.originDestination.reRender();
  }
}
dataAnalysis(startDate, endDate,checkVal){
    
  this._markAsDirty(this.flightInputForm);
  this.checkValue=checkVal;
  this.flightEndDate = this.service.dateFormatter(endDate.toString())
  this.flightStartDate = this.service.dateFormatter(startDate.toString())
  this.service.start=this.flightStartDate;
  this.service.end=this.flightEndDate;
  this.service.statsReport = [];
  this.ServiceCalls()
}

private _markAsDirty(group:FormGroup){
  group.markAsDirty();
  for(let groupIndex in group.controls){
    group.controls[groupIndex].markAsDirty();
  }
}
}
