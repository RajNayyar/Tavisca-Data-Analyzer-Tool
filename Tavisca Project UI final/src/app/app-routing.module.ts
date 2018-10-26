import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WidgetComponent } from './hotel-components/widget/widget.component';
import { FlightWidgetComponent } from './flight-components/flight-widget/flight-widget.component';
const routes:Routes=[
{path:'',redirectTo:'/home',pathMatch:'full'},
{path:'home', component:HomeComponent},
{path:'hotel', component:WidgetComponent},
{path:'flight', component:FlightWidgetComponent}
];

@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
