import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export enum RecipeActionTypes {
  SET_RECIPES = "[recipes] set recipes",
  FETCH_RECIPES_START = "[recipes] fetch recipes start",
  FETCH_RECIPES_FAILED = "[recipes] fetch recipes failed",
  SAVE_RECIPES_START = "[recipes] save recipes start",
  SAVE_RECIPES_FAILED = "[recipes] save recipes failed",
  ADD_RECIPE = "[recipes] add recipe",
  UPDATE_RECIPE = "[recipes] update recipe",
  DELETE_RECIPE = "[recipes] delete recipe",
}

export class SetRecipes implements Action {
  readonly type = RecipeActionTypes.SET_RECIPES;
  constructor(public payload: { recipes: Recipe[] }) {}
}

export class FetchRecipesStart implements Action {
  readonly type = RecipeActionTypes.FETCH_RECIPES_START;
}

export class FetchRecipesFailed implements Action {
  readonly type = RecipeActionTypes.FETCH_RECIPES_FAILED;
  constructor(public payload: string) {}
}

export class SaveRecipesStart implements Action {
  readonly type = RecipeActionTypes.SAVE_RECIPES_START;
}

export class SaveRecipesFailed implements Action {
  readonly type = RecipeActionTypes.SAVE_RECIPES_FAILED;
  constructor(public payload: string) {}
}

export class AddRecipe implements Action {
  readonly type = RecipeActionTypes.ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeActionTypes.UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeActionTypes.DELETE_RECIPE;
  constructor(public payload: { index: number }) {}
}
