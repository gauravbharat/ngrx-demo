import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[auth] login",
  LOGOUT = "[auth] logout",
  LOGIN_START = "[auth] login start",
  LOGIN_FAILED = "[auth] login failed",
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
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

export class LoginFailed implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILED;
  constructor(public payload: string) {}
}
