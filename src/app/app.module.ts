import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from 'ngx-pagination';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { PlayersComponent } from './components/players/players.component';
import { PlayerItemComponent } from './components/player-item/player-item.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamItemComponent } from './components/team-item/team-item.component';
import {HomeComponent} from "./components/home/home.component";
import { MatchesComponent } from './components/matches/matches.component';
import { MatchItemComponent } from './components/match-item/match-item.component';
import { TableComponent } from './components/table/table.component';
import { TableItemComponent } from './components/table-item/table-item.component';
import { LikeButtonComponent } from './components/ui/like-button/like-button.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { PlayerEditComponent } from './components/player-edit/player-edit.component';
import { FavoriteTeamsComponent } from './components/favorite-teams/favorite-teams.component';
import { FavoriteTeamItemComponent } from './components/favorite-team-item/favorite-team-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { SquadsComponent } from './components/match/squads/squads.component';
import { OverviewComponent } from './components/match/overview/overview.component';
import { EventsComponent } from './components/match/events/events.component';
import { EditMatchComponent } from './components/match/edit-match/edit-match.component';
import { FavoriteResultsComponent } from './components/favorites/favorite-results/favorite-results.component';
import { FavoriteFixturesComponent } from './components/favorites/favorite-fixtures/favorite-fixtures.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { GoogleComponent } from './components/auth/google/google.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";

const matchRoutes: Routes = [
  {path: 'overview', component: OverviewComponent},
  {path: 'squads', component: SquadsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'edit', component: EditMatchComponent}
]

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'players', component: PlayersComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'teams/favorites', component: FavoriteTeamsComponent},
  {path: 'teams/favorites/results', component: FavoriteResultsComponent},
  {path: 'teams/favorites/fixtures', component: FavoriteFixturesComponent},
  {path: 'matches', component: MatchesComponent},
  {path: 'matches/:id', component: MatchDetailsComponent, children: matchRoutes},
  {path: 'table', component: TableComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'login/google', component: GoogleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    PlayerItemComponent,
    NavbarComponent,
    HomeComponent,
    TeamsComponent,
    TeamItemComponent,
    MatchesComponent,
    MatchItemComponent,
    TableComponent,
    TableItemComponent,
    LikeButtonComponent,
    SpinnerComponent,
    MatchDetailsComponent,
    PlayerEditComponent,
    FavoriteTeamsComponent,
    FavoriteTeamItemComponent,
    FooterComponent,
    SquadsComponent,
    OverviewComponent,
    EventsComponent,
    EditMatchComponent,
    FavoriteResultsComponent,
    FavoriteFixturesComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    GoogleComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
