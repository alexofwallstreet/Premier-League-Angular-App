export interface User {
  id: number,
  name: string,
  email: string,
  remember_token: string | null,
  role: string,
  is_logged: boolean
}
