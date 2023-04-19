import { Action, createAction, props } from "@ngrx/store";

export const loginStart = createAction(
  "[auth] login start",
  props<{ email: string; password: string }>()
);
export const signupStart = createAction(
  "[auth] signup start",
  props<{ email: string; password: string }>()
);
export const authSuccess = createAction(
  "[auth] authentication success",
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);
export const authFailed = createAction(
  "[auth] authentication failed",
  props<{ errorMessage: string }>()
);
export const clearError = createAction("[auth] clear authentication error");
export const logout = createAction("[auth] logout");
export const autoLogin = createAction("[auth] auto login");
export const autoLogout = createAction("[auth] auto logout");
