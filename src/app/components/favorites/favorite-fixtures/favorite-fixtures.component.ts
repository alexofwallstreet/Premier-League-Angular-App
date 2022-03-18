import { Component, OnInit } from '@angular/core';
import {Match} from "../../../interfaces/Match";
import {MatchService} from "../../../services/match.service";
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../interfaces/Team";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-favorite-fixtures',
  templateUrl: './favorite-fixtures.component.html',
  styleUrls: ['./favorite-fixtures.component.css']
})
export class FavoriteFixturesComponent implements OnInit {
  matches!: Match[];
  favoriteTeams!: Team[];

  loading: boolean = true;

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.teamService.getTeams(user).subscribe((teams) => {
      const allTeams = teams.data;
      this.favoriteTeams = allTeams.filter((team: Team) => {
        return team.is_favorite.exists;
      });
      this.matchService.getFixtures().subscribe((matches) => {
        this.matches = matches.data;
        this.matches = this.matches.filter((match: Match) => {
          return this.favoriteTeams.find(team => team.name === match.home_team.name) || this.favoriteTeams.find(team => team.name === match.away_team.name);
        })
        this.loading = false;
      })
    })
  }
}
