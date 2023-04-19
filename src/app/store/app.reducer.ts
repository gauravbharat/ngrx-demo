import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromRecipes from "../recipes/store/recipe.reducer";
import { ActionReducerMap } from "@ngrx/store";
import { StateKeys } from "./app.types";

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState;
  auth: fromAuth.AuthState;
  recipes: fromRecipes.RecipesState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [StateKeys.SHOPPING_LIST]: fromShoppingList.shoppingListReducer,
  [StateKeys.AUTH]: fromAuth.authReducer,
  [StateKeys.RECIPES]: fromRecipes.recipeReducer,
};
