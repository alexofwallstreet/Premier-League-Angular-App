import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from "../../interfaces/Player";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'tr[app-player-item]',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent implements OnInit {
  @Input() player!: Player;
  @Output() onEditPlayer: EventEmitter<Player> = new EventEmitter();

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onEdit(player: Player) {
    this.onEditPlayer.emit(player);
  }
}
