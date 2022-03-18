import { Component, OnInit } from '@angular/core';
import {Match} from "../../../interfaces/Match";

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {
  match!: Match;

  constructor() { }

  ngOnInit(): void {
    this.match = history.state;
  }

}
