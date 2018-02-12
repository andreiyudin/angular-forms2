import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() title;
  @Input() orders = [];


  constructor() { }

  ngOnInit() {

  }


}
