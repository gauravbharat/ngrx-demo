import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[auth] login",
  LOGOUT = "[auth] logout",
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
