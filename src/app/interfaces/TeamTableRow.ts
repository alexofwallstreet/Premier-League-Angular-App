export interface TeamTableRow {
  id: number,
  name: string,
  logo: string,
  stats: {
    matches: number,
    points: number,
    goalsScored: number,
    goalsConceded: number,
    wins: number,
    draws: number,
    loses: number
  }
}
