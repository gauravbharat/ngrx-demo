import { Action, createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const setRecipes = createAction(
  "[recipes] set recipes",
  props<{ recipes: Recipe[] }>()
);
export const fetchRecipesStart = createAction("[recipes] fetch recipes start");
export const saveRecipesStart = createAction("[recipes] save recipes start");
export const fetchRecipesFailed = createAction(
  "[recipes] fetch recipes failed",
  props<{ errorMessage: string }>()
);
export const saveRecipesFailed = createAction(
  "[recipes] save recipes failed",
  props<{ errorMessage: string }>()
);
export const addRecipe = createAction(
  "[recipes] add recipe",
  props<{ recipe: Recipe }>()
);
export const updateRecipe = createAction(
  "[recipes] update recipe",
  props<{ index: number; newRecipe: Recipe }>()
);
export const deleteRecipe = createAction(
  "[recipes] delete recipe",
  props<{ index: number }>()
);
