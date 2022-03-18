import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from "../../interfaces/Team";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'tr[app-team-item]',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent implements OnInit {
  @Input() team!: Team;
  @Input() loading!: boolean;
  @Output() onAddUserFavoriteTeam: EventEmitter<Team> = new EventEmitter();
  @Output() onDeleteUserFavoriteTeam: EventEmitter<Team> = new EventEmitter();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  toggleFavoriteTeam(team: Team) {
    if (this.loading) {
      return;
    }

    if (team.is_favorite.exists) {
      this.deleteFavoriteTeam(team);
    } else {
      this.onFavoriteTeam(team);
    }
  }

  onFavoriteTeam(team: Team) {
      this.onAddUserFavoriteTeam.emit(team);
  }

  deleteFavoriteTeam(team: Team) {
      this.onDeleteUserFavoriteTeam.emit(team);
  }
}
