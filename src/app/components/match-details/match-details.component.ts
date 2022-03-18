import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchService} from "../../services/match.service";
import {Match} from "../../interfaces/Match";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  id!: number;
  match!: Match;

  private routeSubscription: Subscription;

  constructor(private activateRoute: ActivatedRoute, private router: Router, private matchService: MatchService) {
    this.id = activateRoute.snapshot.params['id'];
    this.routeSubscription = activateRoute.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit(): void {
    this.matchService.getMatch(this.id).subscribe(matchData => {
      this.match = matchData.data;
      this.router.navigate(['overview'], { relativeTo: this.activateRoute, state: this.match });
    })
  }
}
