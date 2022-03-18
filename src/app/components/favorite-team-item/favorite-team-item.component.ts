import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../interfaces/Team";

@Component({
  selector: 'app-favorite-team-item',
  templateUrl: './favorite-team-item.component.html',
  styleUrls: ['./favorite-team-item.component.css']
})
export class FavoriteTeamItemComponent implements OnInit {
  @Input() team!: Team;

  constructor() { }

  ngOnInit(): void {
  }

}
