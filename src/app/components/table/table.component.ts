import { Component, OnInit } from '@angular/core';
import {TeamTableRow} from "../../interfaces/TeamTableRow";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  teamPlace: number = 0;
  teamTable: TeamTableRow[] = [];

  loading: boolean = true;

  constructor(private teamsService: TeamService) { }

  ngOnInit(): void {
    this.loading = true;
    this.teamsService.getTeamTable().subscribe((table) => {
      this.teamTable = table.data;
      this.teamTable.sort(this.sortTable);
      this.loading = false;
    });
  }

  sortTable(a: TeamTableRow, b: TeamTableRow) {
    const aPoints = a.stats.points;
    const bPoints = b.stats.points;
    if (bPoints - aPoints !== 0) {
      return bPoints - aPoints;
    }

    const aGoalDiff = a.stats.goalsScored - a.stats.goalsConceded;
    const bGoalDiff = b.stats.goalsScored - b.stats.goalsConceded;
    if (bGoalDiff - aGoalDiff !== 0) {
      return bGoalDiff - aGoalDiff;
    }

    return parseInt(a.name) - parseInt(b.name);
  }
}
