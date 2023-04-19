import { Action, createReducer, on } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient | null;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredients: state.ingredients.concat([ingredient]),
  })),
  on(ShoppingListActions.addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredients: state.ingredients.concat(ingredients),
  })),
  on(ShoppingListActions.updateIngredient, (state, { index, ingredient }) => {
    const oldIngredient = state.ingredients[index];
    const updatedIngredient = {
      ...oldIngredient,
      ...ingredient,
    };

    const updatedIngredients = state.ingredients.map((v) => v);
    updatedIngredients[index] = updatedIngredient;

    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state, { index }) => {
    const newIngredients = state.ingredients.map((v) => v);
    newIngredients.splice(index, 1);
    return {
      ...state,
      ingredients: newIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),
  on(ShoppingListActions.startEdit, (state, { index }) => ({
    ...state,
    editedIngredientIndex: index,
    editedIngredient: { ...state.ingredients[index] },
  })),
  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  }))
);

export function shoppingListReducer(
  state: ShoppingListState,
  action: Action
): ShoppingListState {
  return _shoppingListReducer(state, action);
}
