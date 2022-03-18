export const environment = {
  production: false,
  baseUrl: 'https://polar-shelf-59117.herokuapp.com/api/v1'
};

export enum ApiPaths {
  Players = '/players',
  Teams = '/teams',
  TeamsList = '/teams/list',
  Matches = '/matches',
  Fixtures = '/matches/fixtures',
  Results = '/matches/results',
  Stadiums = '/stadiums',
  Table = '/table',
  UserFavoriteTeam = '/user-favorite-teams',
  PlayerPositions = '/player-positions',
  MatchEvents = '/match-events',
  GameEvents = '/game-events',
  Login = '/auth/login',
  GoogleLogin = '/auth/google',
  Register = '/auth/register',
  Refresh = '/auth/refresh',
  Logout = '/auth/logout',
  User = '/auth/user'
}
