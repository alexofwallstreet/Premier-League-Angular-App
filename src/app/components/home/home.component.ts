import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() isAdmin!: boolean;
  @Output() changeStatusEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeStatus() {
    this.changeStatusEvent.emit(!this.isAdmin);
  }

}
