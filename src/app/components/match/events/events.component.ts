import {Component, OnInit} from '@angular/core';
import {Match} from "../../../interfaces/Match";
import {MatchService} from "../../../services/match.service";
import {GameEvent} from "../../../interfaces/GameEvent";
import {EventType} from "../../../interfaces/EventType";
import {Team} from "../../../interfaces/Team";
import {MatchEvent} from "../../../interfaces/MatchEvent";
import {Player} from "../../../interfaces/Player";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  match!: Match;
  matchEventTypes!: EventType[];
  gameEventTypes!: EventType[];

  loading: boolean = true;

  newGameEvent!: GameEvent;

  selectedEventType!: number;
  selectedEventPlayer!: number;
  teams!: Team[];

  constructor(
    private matchService: MatchService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.match = history.state;
    this.getEventsTypes();
    this.refreshMatch();
    this.declareModels();
  }

  startMatch() {
    const matchStartEvent: MatchEvent = {
      event_type: this.gameEventTypes[0],
      minute: 0,
      description: 'Match Starts'
    }
    this.matchService.postMatchEvent(this.match, matchStartEvent).subscribe(response => {
      this.match.is_started = true;
      this.refreshMatch();
    });
  }

  endMatch() {
    const matchEndEvent: MatchEvent = {
      event_type: this.gameEventTypes[1],
      minute: 90,
      description: 'Match End'
    }
    this.matchService.postMatchEvent(this.match, matchEndEvent).subscribe(response => {
      this.match.is_finished = true;
      this.refreshMatch();
    });
  }

  getEventsTypes() {
    this.matchService.getMatchEventTypes().subscribe((matchTypes) => {
      this.matchService.getGameEventTypes().subscribe((gameTypes) => {
        this.matchEventTypes = matchTypes;
        this.gameEventTypes = gameTypes;
      })
    });
  }

  declareModels() {
    this.teams = [this.match.home_team, this.match.away_team];
    this.newGameEvent = {
      minute: 0,
      team_id: this.match.home_team.id,
      player_id: this.match.home_team.players![0].id,
      event_type: {
        id: 1,
        code: 'GOAL'
      }
    }
  }

  addGameEvent() {
    this.matchService.postGameEvent(this.match, this.newGameEvent).subscribe(response => {
      this.refreshMatch();
    });
  }

  refreshMatch() {
    this.loading = true;
    this.matchService.getMatch(this.match.id).subscribe(match => {
      this.match = match.data;
      this.match.game_events?.sort((event1, event2) => {
        return event1.minute - event2.minute;
      })
      this.loading = false;
    });
  }

  changeTeam($event: number) {
    const newTeam = this.teams.find((team: Team) => {
      return team.id === $event;
    });
    this.newGameEvent.team_id = newTeam!.id;
    this.newGameEvent.player_id = newTeam!.players![0].id;
  }

  getTeamName(teamId: any) {
    return teamId === this.match.home_team.id ? this.match.home_team.name : this.match.away_team.name;
  }

  getPlayerFullname(player_id: number) {
    let player: Player = this.match.home_team.players?.find(p => p.id === player_id)!;
    if (!player) {
      player = this.match.away_team.players?.find(p => p.id === player_id)!;
    }
    return player.name + ' ' + player.surname;
  }

  getTeamPlayers() {
    const teamId = this.newGameEvent.team_id;
    const team = this.match.home_team.id === teamId ? this.match.home_team : this.match.away_team;
    return team.players;
  }

  copy(obj: any) {
    return JSON.parse(JSON.stringify(obj))
  }
}
