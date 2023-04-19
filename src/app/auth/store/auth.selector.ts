import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { StateKeys } from "src/app/store/app.types";

const authState = createFeatureSelector<AuthState>(StateKeys.AUTH);

export const isAuthenticated = createSelector(
  authState,
  (state) => !!state.user
);

export const user = createSelector(authState, (state) => state.user);
