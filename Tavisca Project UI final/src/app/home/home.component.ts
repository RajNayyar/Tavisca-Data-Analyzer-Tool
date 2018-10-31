import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from '../service/data-analytical-service/graphs-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
dateMessage: string;
  constructor(private service: GraphsServiceService) { 
    setInterval(()=> {
      let currentDate = new Date();
      this.dateMessage = currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString()
    },1000);
  }

  ngOnInit() {
    this.service.statsReport=[];
    let currentDate = new Date();
    this.dateMessage = currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString()
  }

}
