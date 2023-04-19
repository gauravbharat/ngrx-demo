import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StateKeys } from "src/app/store/app.types";
import { ShoppingListState } from "./shopping-list.reducer";

const shoppingListState = createFeatureSelector<ShoppingListState>(
  StateKeys.SHOPPING_LIST
);

export const ingredients = createSelector(
  shoppingListState,
  (state) => state.ingredients
);
