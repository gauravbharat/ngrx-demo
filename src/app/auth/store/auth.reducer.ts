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

export function authReducer(
  state = initialState,
  action:
    | AuthActions.AuthSuccess
    | AuthActions.Logout
    | AuthActions.LoginStart
    | AuthActions.AuthFailed
    | AuthActions.SignupStart
    | AuthActions.ClearError
): AuthState {
  console.log("authReducer", state, action);

  switch (action.type) {
    case AuthActions.AuthActionTypes.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        user,
        authError: null,
        loading: false,
      };

    case AuthActions.AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
        loading: false,
      };

    case AuthActions.AuthActionTypes.LOGIN_START:
    case AuthActions.AuthActionTypes.SIGNUP_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }

    case AuthActions.AuthActionTypes.AUTH_FAILED: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }

    case AuthActions.AuthActionTypes.CLEAR_ERROR: {
      return {
        ...state,
        authError: null,
      };
    }

    default:
      return state;
  }
}
