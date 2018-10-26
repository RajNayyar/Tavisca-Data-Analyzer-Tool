import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  homeRoute: string = "home";
  hotelRoute: string="hotel";
  flightRoute: string="flight";

  ngOnInit() {
    console.log("header")
  }

}
