import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../../interfaces/Player";
import {Position} from "../../interfaces/Position";
import {Team} from "../../interfaces/Team";
import {TeamService} from "../../services/team.service";
import {PlayerPositionService} from "../../services/player-position.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  @Input() player!: Player;
  @Output() onEditPlayer: EventEmitter<Player> = new EventEmitter();
  @Output() onModalClose: EventEmitter<any> = new EventEmitter();

  loading: boolean = true;
  positions!: Position[];
  teams!: Team[];

  constructor(
    private teamService: TeamService,
    private positionService: PlayerPositionService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.teamService.getTeamsList(user).subscribe(teams => {
      this.positionService.getPositions().subscribe(positions => {
        this.teams = teams.data;
        this.positions = positions.data;
        this.loading = false;
      });
    });
  }

  onEdit(player: Player) {
    this.onEditPlayer.emit(player);
  }

  onClose() {
    this.onModalClose.emit();
  }

  onTeamChange() {
    const newTeam = this.teams.find(team => team.id === this.player.team.id);
    if (newTeam) {
      this.player.team.name = newTeam.name;
    }
  }

  onPositionChange() {
    const newPosition = this.positions.find(p => p.id === this.player.position.id);
    if (newPosition) {
      this.player.position.name = newPosition.name;
    }
  }
}
