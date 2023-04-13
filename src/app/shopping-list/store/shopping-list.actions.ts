import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export enum SHOPPING_LIST_ACTION_TYPES {
  ADD_INGREDIENT = "ADD_INGREDIENT",
  ADD_INGREDIENTS = "ADD_INGREDIENTS",
  UPDATE_INGREDIENT = "UPDATE_INGREDIENT",
  DELETE_INGREDIENT = "DELETE_INGREDIENT",
  START_EDIT = "START_EDIT",
  STOP_EDIT = "STOP_EDIT",
}

export class AddIngredient implements Action {
  readonly type = SHOPPING_LIST_ACTION_TYPES.ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = SHOPPING_LIST_ACTION_TYPES.ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = SHOPPING_LIST_ACTION_TYPES.UPDATE_INGREDIENT;
  constructor(public payload: { index: number; ingredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = SHOPPING_LIST_ACTION_TYPES.DELETE_INGREDIENT;
  constructor(public payload: { index: number }) {}
}

export class StartEdit implements Action {
  readonly type = SHOPPING_LIST_ACTION_TYPES.START_EDIT;
  constructor(public payload: { index: number }) {}
}

export class StopEdit implements Action {
  readonly type = SHOPPING_LIST_ACTION_TYPES.STOP_EDIT;
}
