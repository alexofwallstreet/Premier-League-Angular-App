import {Component, OnInit} from '@angular/core';
import {Team} from "../../interfaces/Team";
import {TeamService} from "../../services/team.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-favorite-teams',
  templateUrl: './favorite-teams.component.html',
  styleUrls: ['./favorite-teams.component.css']
})
export class FavoriteTeamsComponent implements OnInit {
  teams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.teamService.getTeamsList(user).subscribe((teams) => {
      const allTeams = teams.data;
      this.teams = allTeams.filter((team: Team) => {
        return team.is_favorite.exists;
      });
    })
  }

}
