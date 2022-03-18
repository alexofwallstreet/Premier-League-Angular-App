import {Component, OnInit, ViewChild} from '@angular/core';
import {Player} from "../../interfaces/Player";
import {PlayerService} from "../../services/player.service";
import {Pagination} from "../../interfaces/Pagination";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  pagination: Pagination = {  page: 1 };
  loading: boolean = true;

  playerToEdit!: Player;
  showEditModal: boolean = false;

  constructor(
    private playerService: PlayerService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  gty(page: number){
    this.getPlayers(page);
  }

  openEditModal(player: Player) {
    this.playerToEdit = player;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  updatePlayer(player: Player) {
    this.playerService.updatePlayer(player).subscribe(() => {
      this.closeEditModal();
    });
  }

  getPlayers(page: number = 1) {
    this.loading = true;
    this.playerService.getPlayers(page).subscribe((players) => {
      this.players = players.data;
      this.pagination.totalItems = players.meta.total;
      this.pagination.itemsPerPage = players.meta.per_page;
      this.loading = false;
    });
  }
}
