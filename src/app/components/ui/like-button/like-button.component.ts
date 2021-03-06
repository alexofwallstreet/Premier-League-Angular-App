import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {
  @Input() isFavorite!: boolean;
  @Input() isDisabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
