import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
  "[shopping list] add ingredient",
  props<{ ingredient: Ingredient }>()
);
export const addIngredients = createAction(
  "[shopping list] add ingredients",
  props<{ ingredients: Ingredient[] }>()
);
export const updateIngredient = createAction(
  "[shopping list] update ingredient",
  props<{ index: number; ingredient: Ingredient }>()
);
export const deleteIngredient = createAction(
  "[shopping list] delete ingredient",
  props<{ index: number }>()
);
export const startEdit = createAction(
  "[shopping list] start edit",
  props<{ index: number }>()
);
export const stopEdit = createAction("[shopping list] stop edit");
