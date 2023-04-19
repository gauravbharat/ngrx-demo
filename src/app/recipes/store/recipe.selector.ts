import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipesState } from "./recipe.reducer";
import { StateKeys } from "src/app/store/app.types";

const recipesState = createFeatureSelector<RecipesState>(StateKeys.RECIPES);

export const recipes = createSelector(recipesState, (state) => state.recipes);
