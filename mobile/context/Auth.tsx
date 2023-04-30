import { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from '../types';

interface State {
  authenticated: boolean
  user: User | undefined
  loading: boolean
}

interface Action {
  type: string
  payload: any
}

const StateContext = createContext<State>({
  authenticated: false,
  user: undefined,
  loading: true,
});

const DispatchContext = createContext({});

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'SIGNIN':
      return {
        ...state,
        authenticated: true,
        user: payload,
      }
    case 'SIGNOUT':
      return { ...state, authenticated: false, user: null }
    case 'STOP_LOADING':
      return { ...state, loading: false }
    default:
      throw new Error(`Neznámy typ akcie: ${type}`)
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  })

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload })

  useEffect(() => {
    async function loadUser() {
      try {
        const res = null
        dispatch('SIGNIN', {})
      } catch (err) {
        console.error(err)
      } finally {
        dispatch('STOP_LOADING')
      }
    }
    loadUser()
  }, [])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
