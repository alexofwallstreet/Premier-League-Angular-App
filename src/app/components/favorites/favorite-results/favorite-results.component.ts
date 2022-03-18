import { Component, OnInit } from '@angular/core';
import {Match} from "../../../interfaces/Match";
import {Team} from "../../../interfaces/Team";
import {MatchService} from "../../../services/match.service";
import {TeamService} from "../../../services/team.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-favorite-results',
  templateUrl: './favorite-results.component.html',
  styleUrls: ['./favorite-results.component.css']
})
export class FavoriteResultsComponent implements OnInit {
  matches!: Match[];
  favoriteTeams!: Team[];

  loading: boolean = true;

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.teamService.getTeams(user).subscribe((teams) => {
      const allTeams = teams.data;
      this.favoriteTeams = allTeams.filter((team: Team) => {
        return team.is_favorite.exists;
      });
      this.matchService.getResults().subscribe((matches) => {
        this.matches = matches.data;
        this.matches = this.matches.filter((match: Match) => {
          return this.favoriteTeams.find(team => team.name === match.home_team.name) || this.favoriteTeams.find(team => team.name === match.away_team.name);
        })
        this.loading = false;
      })
    })
  }
}
