import { Component, OnInit } from '@angular/core';
import {Match} from "../../interfaces/Match";
import {MatchService} from "../../services/match.service";
import {Pagination} from "../../interfaces/Pagination";
import {Team} from "../../interfaces/Team";
import {TeamService} from "../../services/team.service";
import {StadiumService} from "../../services/stadium.service";
import {Stadium} from "../../interfaces/Stadium";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];
  pagination: Pagination = {page: 1};

  teamList: Team[] = [];
  stadiumList: Stadium[] = [];

  newMatch = {
    home_team: {id: 1},
    away_team: {id: 2},
    stadium: {id: 1},
    date: new Date().toISOString().slice(0, 10)+'T18:30'
  };

  loading: boolean = true;
  loadingForm: boolean = true;

  constructor(
    private matchService: MatchService,
    private teamService: TeamService,
    private stadiumService: StadiumService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getMatches();
    this.getTeamList();
    this.getStadimList();
  }

  gty(page:number): void {
    this.getMatches(page);
  }

  getMatches(page:number = 1): void {
    this.loading = true;
    this.matchService.getMatches(page).subscribe(matches => {
      this.matches = matches.data;
      this.pagination.totalItems = matches.meta.total;
      this.pagination.itemsPerPage = matches.meta.per_page;
      this.loading = false;
    })
  }

  addMatch() {
    if (this.newMatch.home_team.id === this.newMatch.away_team.id) {
      alert('Teams cannot be similar!');
      return;
    }

    this.matchService.addMatch(this.newMatch).subscribe(response => {
      this.getMatches(this.pagination.page);
    })
  }

  getTeamList() {
    const user = this.userService.getUser();
    this.teamService.getTeamsList(user).subscribe(teams => {
      this.teamList = teams.data;
      this.newMatch.home_team = this.copy(this.teamList[0]);
      this.newMatch.away_team = this.copy(this.teamList[1]);
    });
  }

  getStadimList() {
    this.loadingForm = true;
    this.stadiumService.getStadiums().subscribe(stadiums => {
      this.stadiumList = stadiums.data;
      this.newMatch.stadium = this.copy(this.stadiumList[0]);
      this.loadingForm = false;
    })
  }

  copy(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }

  getDate() {
    return new Date();
  }
}
