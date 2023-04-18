import { Recipe } from "../recipe.model";
import * as RecipeActions from "./recipe.actions";

export interface RecipesState {
  recipes: Recipe[];
  loading: boolean;
  apiError: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  loading: false,
  apiError: null,
};

export function recipeReducer(
  state = initialState,
  action:
    | RecipeActions.SetRecipes
    | RecipeActions.FetchRecipesStart
    | RecipeActions.FetchRecipesFailed
    | RecipeActions.SaveRecipesStart
    | RecipeActions.SaveRecipesFailed
    | RecipeActions.AddRecipe
    | RecipeActions.UpdateRecipe
    | RecipeActions.DeleteRecipe
): RecipesState {
  switch (action.type) {
    case RecipeActions.RecipeActionTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload.recipes,
        loading: false,
        apiError: null,
      };

    case RecipeActions.RecipeActionTypes.FETCH_RECIPES_START:
    case RecipeActions.RecipeActionTypes.SAVE_RECIPES_START:
      return {
        ...state,
        loading: true,
        apiError: null,
      };

    case RecipeActions.RecipeActionTypes.FETCH_RECIPES_FAILED:
    case RecipeActions.RecipeActionTypes.SAVE_RECIPES_FAILED:
      return {
        ...state,
        loading: false,
        apiError: action.payload,
      };

    case RecipeActions.RecipeActionTypes.ADD_RECIPE:
      return {
        ...state,
        recipes: state.recipes.concat([action.payload]),
      };

    case RecipeActions.RecipeActionTypes.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };
      const newRecipes = state.recipes.map((v) => v);
      newRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: newRecipes,
      };

    case RecipeActions.RecipeActionTypes.DELETE_RECIPE:
      const recipes = state.recipes.map((v) => v);
      recipes.splice(action.payload.index, 1);

      return {
        ...state,
        recipes,
      };

    default:
      return state;
  }
}
