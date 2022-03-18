import {Component, Input, OnInit} from '@angular/core';
import {TeamTableRow} from "../../interfaces/TeamTableRow";

@Component({
  selector: 'tr[app-table-item]',
  templateUrl: './table-item.component.html',
  styleUrls: ['./table-item.component.css']
})
export class TableItemComponent implements OnInit {
  @Input() team!: TeamTableRow;
  @Input() teamPlace!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
