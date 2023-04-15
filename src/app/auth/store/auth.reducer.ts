import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.Login | AuthActions.Logout
): AuthState {
  switch (action.type) {
    case AuthActions.AuthActionTypes.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        user,
      };

    case AuthActions.AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
