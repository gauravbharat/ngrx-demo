import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  AUTH_SUCCESS = "[auth] authentication success",
  LOGOUT = "[auth] logout",
  LOGIN_START = "[auth] login start",
  AUTH_FAILED = "[auth] authentication failed",
  SIGNUP_START = "[auth] signup start",
  CLEAR_ERROR = "[auth] clear authentication error",
  AUTO_LOGIN = "[auth] auto login",
  AUTO_LOGOUT = "[auth] auto logout",
}

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LoginStart implements Action {
  readonly type = AuthActionTypes.LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignupStart implements Action {
  readonly type = AuthActionTypes.SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFailed implements Action {
  readonly type = AuthActionTypes.AUTH_FAILED;
  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = AuthActionTypes.CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AUTO_LOGIN;
}

export class AutoLogout implements Action {
  readonly type = AuthActionTypes.AUTO_LOGOUT;
}
