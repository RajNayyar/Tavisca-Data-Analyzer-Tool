import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatTabsModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import { WidgetComponent } from './hotel-components/hotel-widget/widget.component';
import { HomeComponent } from './home/home.component';
import {MatAutocompleteModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatRippleModule,MatNativeDateModule,MatSelectModule} from "@angular/material";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FlightWidgetComponent } from './flight-components/flight-widget/flight-widget.component';
import { BookingWithDatesGraphComponent } from './hotel-components/Hotel-Statistics/booking-with-dates-graph/booking-with-dates-graph.component';
import { SupplierNameBasedGraphComponent } from './hotel-components/Hotel-Statistics/supplier-name-based-graph/supplier-name-based-graph.component';
import { PaymentModeBasedGraphComponent } from './hotel-components/Hotel-Statistics/payment-mode-based-graph/payment-mode-based-graph.component';
import { HotelLocationsPipe } from './pipes/hotel-pipes/hotel-locations.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  GraphsServiceService } from './service/data-analytical-service/graphs-service.service';
import { HttpClientModule } from '@angular/common/http';
import  'chartjs-plugin-zoom';
import 'hammerjs';
import { HotelNamesWithDatesGraphComponent } from './hotel-components/Hotel-Statistics/hotel-names-with-dates-graph/hotel-names-with-dates-graph.component';
import { HotelLocationBasedGraphComponent } from './hotel-components/Hotel-Statistics/hotel-location-based-graph/hotel-location-based-graph.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FailureComponent } from './home/hotelBookingStatus/failure/failure.component';
import { SuccessComponent } from './home/hotelBookingStatus/success/success.component';
import { CancelledComponent } from './home/hotelBookingStatus/cancelled/cancelled.component';
import { flightFailureComponent } from './home/flightBookingStatus/failure/failure.component';
import { flightSuccessComponent } from './home/flightBookingStatus/success/success.component';
import { flightCancelledComponent } from './home/flightBookingStatus/cancelled/cancelled.component';
import {MatCardModule} from '@angular/material/card';
import { HotelBookingStatusStatsComponent } from './home/hotelBookingStatus/hotel-booking-status-stats/hotel-booking-status-stats.component';
import { FlightPaymentModeComponent } from './flight-components/Flight-Statistics/flight-payment-mode/flight-payment-mode.component';
import { MarketingAirlineGraphComponent } from './flight-components/Flight-Statistics/marketing-airline-graph/marketing-airline-graph.component';
import { FlightTotalBookingsGraphComponent } from './flight-components/Flight-Statistics/flight-total-bookings-graph/flight-total-bookings-graph.component';
import { FlightBookingWithDateRangeGraphComponent } from './flight-components/Flight-Statistics/flight-booking-with-date-range-graph/flight-booking-with-date-range-graph.component';
import { FlightOriginDestinationGraphComponent } from './flight-components/Flight-Statistics/flight-origin-destination-graph/flight-origin-destination-graph.component';
import { FlightBookingStatusStatsComponent } from './home/flightBookingStatus/flight-booking-status-stats/flight-booking-status-stats.component';
import { FlightSourcePipe } from './pipes/flight-pipes/flight-source.pipe';
import { FlightDestinationPipe } from './pipes/flight-pipes/flight-destination.pipe';
import { StatsReportNotifierComponent } from './stats-report-notifier/stats-report-notifier.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NotifierEmailDialogComponent } from './notifier-email-dialog/notifier-email-dialog.component';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WidgetComponent,
    HomeComponent,
    FlightWidgetComponent,
    BookingWithDatesGraphComponent,
    SupplierNameBasedGraphComponent,
    PaymentModeBasedGraphComponent,
    HotelLocationsPipe,
    HotelNamesWithDatesGraphComponent,
    FailureComponent,
    flightFailureComponent,
    flightSuccessComponent ,
    flightCancelledComponent, 
    SuccessComponent,
    CancelledComponent,
    HotelBookingStatusStatsComponent,
    FlightPaymentModeComponent,
    MarketingAirlineGraphComponent,
    FlightTotalBookingsGraphComponent,
    FlightBookingWithDateRangeGraphComponent,
    FlightOriginDestinationGraphComponent,
    FlightBookingStatusStatsComponent,
    FlightSourcePipe,
    FlightDestinationPipe,
    StatsReportNotifierComponent,
    HotelLocationBasedGraphComponent,
    NotifierEmailDialogComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 130,
      outerStrokeWidth: 22,
      innerStrokeWidth: 12,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
     }),
    MatNativeDateModule,
    CommonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports:[
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  entryComponents: [
    NotifierEmailDialogComponent
],
  providers: [ GraphsServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
