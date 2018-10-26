
import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import {  GraphsServiceService } from '../../service/hotel-service/graphs-service.service';
import { stringify } from '@angular/core/src/util';
import { BookingWithDatesGraphComponent } from '../Hotel-Statistics/booking-with-dates-graph/booking-with-dates-graph.component';
import { HotelLocationBasedGraphComponent } from '../Hotel-Statistics/hotel-location-based-graph/hotel-location-based-graph.component';
import { HotelNamesWithDatesGraphComponent } from '../Hotel-Statistics/hotel-names-with-dates-graph/hotel-names-with-dates-graph.component';
import { LocationBasedGraphComponent } from '../Hotel-Statistics/location-based-graph/location-based-graph.component';
import { PaymentModeBasedGraphComponent } from '../Hotel-Statistics/payment-mode-based-graph/payment-mode-based-graph.component';
import { SupplierNameBasedGraphComponent } from '../Hotel-Statistics/supplier-name-based-graph/supplier-name-based-graph.component';

import { trigger, state, style, transition, animate } from '@angular/animations';
export interface Graph {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],   
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

export class WidgetComponent implements OnInit {
  isNavbarCollapsed=true;
  _isNavbarCollapsedAnim = 'closed';
  isDisabled:boolean;
  @HostListener('window:resize', ['$event.target']) 
onResize(event) { 
  if(event.innerWidth > 990){
    
    this.show=false;
    this._isNavbarCollapsedAnim = 'open';
      this.isNavbarCollapsed = true;
  }else{
    this.show=true;
      this._isNavbarCollapsedAnim = 'closed';
  }
}
  toggleNavbar(): void {
    if(this.isNavbarCollapsed){
        this._isNavbarCollapsedAnim = 'open';
      this.isNavbarCollapsed = false;
    } else {
    this._isNavbarCollapsedAnim = 'closed';
  
      this.isNavbarCollapsed = true;
    }
  }
  get isNavbarCollapsedAnim() : string {
    return this._isNavbarCollapsedAnim;
  }

 currentStartDate:Date;
  currentEndDate:Date=new Date();
  hotelEndDate:string;
  hotelStartDate: string;
  selectedValue:string;
  temp = "hello";
  minDate = new Date(2016, 0, 1);
  maxDate = new Date();
  startDate:Date=null;
  location:any;
  ids:any;
  IsVisible:boolean=true;
  searchTerm:any;
  checkValue:Array<string>=['location', 'name', 'bookDate', 'supplierName', 'failure', 'paymentMode'];
  paymentServiceResponse: any;

  show:boolean;
  graphs: Graph[] = [
    {value: 'location', viewValue: 'Hotel Location'},
   // {value: 'chain', viewValue: 'Hotel Chain'},
   // {value: 'rating', viewValue: 'Rating'},
    {value: 'name', viewValue: 'Hotel Name'},
 //  {value: 'date', viewValue: 'Check-in and Check-out Date'},
    {value: 'bookDate', viewValue: 'Booking Date'},
    {value: 'supplierName', viewValue: 'Supplier Name'},
    //{value: 'failure', viewValue: 'Booking Failure Count'},
    {value: 'paymentMode', viewValue: 'Payment Mode'}
  ];

    response:any;
    res:any [];
    errorMsg:any;
    inputForm:FormGroup;
    constructor(private fb:FormBuilder, private service:GraphsServiceService ){
      
      this.service.httpResponseFilters("Hotels","HotelLocations")
      .subscribe( data=>{ this.response = data;
                          this.res = data["city"]; },
                  error=>{ this.errorMsg = error;});
 }

  ngOnInit() {
    this.show=false;
    this.onResize(window);
    this.inputForm=this.fb.group({
      'startDateControl':[null,[Validators.required]],
      'endDateControl':[null,[Validators.required]],
      'location':[null,[Validators.required]]
    });
  
  }
  
  checkStartDate(){
    this.IsVisible=false;
  }
   ServiceCalls()
  {
   var hotelLocation = new HotelLocationBasedGraphComponent(this.service)
   var hotelNames = new HotelNamesWithDatesGraphComponent(this.service)
   var book = new BookingWithDatesGraphComponent(this.service)
   var    supplierName = new SupplierNameBasedGraphComponent(this.service)
   var payment = new PaymentModeBasedGraphComponent(this.service)
    console.log(this.checkValue);

    if(this.checkValue.includes('location'))
    { 
      debugger;
      hotelLocation.reRender();
    }
    if(this.checkValue.includes ('name'))
    {
      debugger;
      hotelNames.reRender();}
    if(this.checkValue.includes('bookDate'))
    { debugger;
      book.reRender();}
    if(this.checkValue.includes('supplierName'))
    { debugger;
      supplierName.reRender();}
    if(this.checkValue.includes('paymentMode'))
    {debugger;
       payment.reRender();}

  }


  dataAnalysis(startDate, endDate,checkVal){
    
    this._markAsDirty(this.inputForm);
    this.hotelEndDate = endDate.toString();
    this.checkValue=checkVal;
    this.hotelStartDate = startDate.toString();
    this.hotelEndDate = this.dateFormatter(this.hotelEndDate)
    this.hotelStartDate = this.dateFormatter(this.hotelStartDate)

    this.service.start=this.hotelStartDate;
    this.service.end=this.hotelEndDate;
    this.service.location=this.searchTerm;
this.service.statsReport = [];
   
    //debugger
     this.ServiceCalls()
     //this.GetLocationData();
    
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
