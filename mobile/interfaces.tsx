export interface ContextAction {
  type: string
  payload: any
}

export interface AuthContextState {
  signup: () => void,
  signin: (accessToken: string, refreshToken: string, user: {email: string, username: string}) => void,
  signout: () => void,
  isLoading: boolean,
  accessToken: string | null,
}