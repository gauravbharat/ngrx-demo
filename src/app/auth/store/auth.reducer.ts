import { Action, createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.authSuccess, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );
    return {
      ...state,
      user,
      authError: null,
      loading: false,
    };
  }),
  on(AuthActions.authFailed, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    authError: null,
    loading: false,
  })),
  on(AuthActions.clearError, (state) => ({ ...state, authError: null }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
  return _authReducer(state, action);
}
