import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../interfaces/Match";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'tr[app-match-item]',
  templateUrl: './match-item.component.html',
  styleUrls: ['./match-item.component.css']
})
export class MatchItemComponent implements OnInit {
  @Input() match!: Match;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
