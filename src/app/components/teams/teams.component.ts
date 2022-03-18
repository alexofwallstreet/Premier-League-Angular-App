import { Component, OnInit } from '@angular/core';
import {Team} from "../../interfaces/Team";
import {TeamService} from "../../services/team.service";
import {Pagination} from "../../interfaces/Pagination";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];

  loading: boolean = true;
  loadingRow: boolean = false;

  constructor(
    private teamsService: TeamService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.getTeam();
  }

  getTeam() {
    this.loading = true;
    const user = this.userService.getUser();
    this.teamsService.getTeamsList(user).subscribe((teams) => {
        this.teams = teams.data;
        this.loading = false;
    });
  }

  addUserFavoriteTeam(team: Team) {
    this.loadingRow = true;
    const user = this.userService.getUser();
    this.teamsService.addUserFavoriteTeam(team, user).subscribe(favoriteTeam => {
      team.is_favorite.id = favoriteTeam.data.id;
      team.is_favorite.exists = true;
      this.loadingRow = false;
    });
  }

  deleteUserFavoriteTeam(team: Team) {
    this.loadingRow = true;
    this.teamsService.deleteUserFavoriteTeam(team).subscribe(favoriteTeam => {
      team.is_favorite.exists = false;
      this.loadingRow = false;
    });
  }
}
