import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WidgetComponent } from './hotel-components/widget/widget.component';
import { FlightWidgetComponent } from './flight-components/flight-widget/flight-widget.component';
const routes:Routes=[

];

@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
