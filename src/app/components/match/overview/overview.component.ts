import { Component, OnInit } from '@angular/core';
import {Match} from "../../../interfaces/Match";
import {MatchService} from "../../../services/match.service";
import {localizePolyfill} from "@angular/localize/schematics/ng-add";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  match!: Match;

  goalsHomeTeam: number = 0;
  goalsAwayTeam: number = 0;

  loading: boolean = true;

  constructor(
    private matchService: MatchService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.match = history.state;
    this.calculateGoals();
    this.refreshMatch();
  }

  refreshMatch() {
    this.loading = true;
    this.matchService.getMatch(this.match.id).subscribe(match => {
      this.match = match.data;
      this.calculateGoals();
      this.loading = false;
    });
  }

  calculateGoals() {
    let goalsHomeTeam = 0;
    let goalsAwayTeam = 0;
    if (this.match.game_events) {
      this.match.game_events.forEach(event => {
        // @ts-ignore
        if (event.event === "GOAL") {
          // @ts-ignore
          if (event.team === this.match.home_team.id) {
            goalsHomeTeam++;
          }
          // @ts-ignore
          if (event.team === this.match.away_team.id) {
            goalsAwayTeam++;
          }
        }
      });
    }
    this.goalsHomeTeam = goalsHomeTeam;
    this.goalsAwayTeam = goalsAwayTeam;
  }
}
