
import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators,FormControl,FormBuilder } from '@angular/forms';
import {  GraphsServiceService } from '../../service/data-analytical-service/graphs-service.service';
import { stringify } from '@angular/core/src/util';
import { BookingWithDatesGraphComponent } from '../Hotel-Statistics/booking-with-dates-graph/booking-with-dates-graph.component';
import { HotelLocationBasedGraphComponent } from '../Hotel-Statistics/hotel-location-based-graph/hotel-location-based-graph.component';
import { HotelNamesWithDatesGraphComponent } from '../Hotel-Statistics/hotel-names-with-dates-graph/hotel-names-with-dates-graph.component';
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
      if(event.innerWidth > 1360) {
         this.show=false;
         this._isNavbarCollapsedAnim = 'open';
         this.isNavbarCollapsed = true;
      }
      else {
         this.show=true;
         this._isNavbarCollapsedAnim = 'closed';
      }
  }
  toggleNavbar(): void {
    if(this.isNavbarCollapsed){
        this._isNavbarCollapsedAnim = 'open';
        this.isNavbarCollapsed = false;
    } 
    else {
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
  minDate = new Date(2014, 0, 1);
  maxDate = new Date();
  startDate:Date=null;
  location:any;
  IsVisible:boolean=true;
  selectedLocation:any;
  checkValue:Array<string>=['location', 'name', 'bookDate', 'supplierName', 'failure', 'paymentMode'];
  paymentServiceResponse: any;
  show:boolean;
  graphs: Graph[] = [
    {value: 'location', viewValue: 'Hotels-Bookings at Location'},
    {value: 'name', viewValue: 'Bookings at all locations'},
    {value: 'bookDate', viewValue: 'Bookings on specified dates '},
    {value: 'supplierName', viewValue: 'Supplier-booking Statistics'},
    {value: 'paymentMode', viewValue: 'Payment-Mode Statistics'}
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
    this.service.statsReport = [];
    this.service.location = "Las Vegas";
    this.service.start = "2015-05-15";
    this.service.end = "2018-05-15";
    this.ServiceCalls();
    this.show=false;
    this.onResize(window);
    this.inputForm=this.fb.group({
      'startDateControl':[null,[Validators.required]],
      'endDateControl':[null,[Validators.required]],
      'location':[null,[Validators.required]],
      'filterControl':[null,[Validators.required]]
    });
  
  }
  checkStartDate() {
    this.IsVisible=false;
  }
   ServiceCalls() {
   var hotelLocation = new HotelLocationBasedGraphComponent(this.service)
   var hotelNames = new HotelNamesWithDatesGraphComponent(this.service)
   var book = new BookingWithDatesGraphComponent(this.service)
   var supplierName = new SupplierNameBasedGraphComponent(this.service)
   var payment = new PaymentModeBasedGraphComponent(this.service)
    console.log(this.checkValue);
    if(this.checkValue.includes('location')) { 
      hotelLocation.reRenderChart();
    }
    if(this.checkValue.includes ('name')) {
      hotelNames.reRenderChart();
    }
    if(this.checkValue.includes('bookDate')) {
      book.reRenderChart();
    }
    if(this.checkValue.includes('supplierName')) { 
      supplierName.reRenderChart();
    }
    if(this.checkValue.includes('paymentMode')) {
       payment.reRenderChart();
    }
  }
  dataAnalysis(startDate, endDate,checkVal){
    this._markAsDirty(this.inputForm);
    this.checkValue=checkVal;
    this.hotelEndDate = this.service.dateFormatter(endDate.toString())
    this.hotelStartDate = this.service.dateFormatter(startDate.toString())
    this.service.start=this.hotelStartDate;
    this.service.end=this.hotelEndDate;
    this.service.location=this.selectedLocation;
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
