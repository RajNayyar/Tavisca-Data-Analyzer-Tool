import { Component, OnInit } from '@angular/core';
import { GraphsServiceService } from '../service/data-analytical-service/graphs-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public service: GraphsServiceService) { }

  ngOnInit() {
  }

}
