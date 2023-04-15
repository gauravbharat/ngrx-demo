import { Action } from "@ngrx/store";

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

export function shoppingListReducer(
  state = initialState,
  action:
    | ShoppingListActions.AddIngredient
    | ShoppingListActions.AddIngredients
    | ShoppingListActions.UpdateIngredient
    | ShoppingListActions.DeleteIngredient
    | ShoppingListActions.StartEdit
    | ShoppingListActions.StopEdit
): ShoppingListState {
  console.log("shoppingListReducer", state, action);

  switch (action.type) {
    case ShoppingListActions.SHOPPING_LIST_ACTION_TYPES.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.concat([action.payload]),
      };

    case ShoppingListActions.SHOPPING_LIST_ACTION_TYPES.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: state.ingredients.concat(action.payload),
      };

    case ShoppingListActions.SHOPPING_LIST_ACTION_TYPES.UPDATE_INGREDIENT:
      const oldIngredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...oldIngredient,
        ...action.payload.ingredient,
      };

      const updatedIngredients = state.ingredients.map((v) => v);
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.SHOPPING_LIST_ACTION_TYPES.DELETE_INGREDIENT:
      const newIngredients = state.ingredients.map((v) => v);
      newIngredients.splice(action.payload.index, 1);
      return {
        ...state,
        ingredients: newIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    case ShoppingListActions.SHOPPING_LIST_ACTION_TYPES.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload.index,
        editedIngredient: { ...state.ingredients[action.payload.index] },
      };

    case ShoppingListActions.SHOPPING_LIST_ACTION_TYPES.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };

    default:
      return state;
  }
}
