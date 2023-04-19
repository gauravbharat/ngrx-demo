import { Action, createReducer, on } from "@ngrx/store";
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

const _recipesReducer = createReducer(
  initialState,
  on(RecipeActions.setRecipes, (state, action) => {
    // console.log("RecipesState : RecipeActions.setRecipes", state, action);

    return {
      ...state,
      recipes: action.recipes,
      loading: false,
      apiError: null,
    };
  }),
  on(
    RecipeActions.fetchRecipesStart,
    RecipeActions.saveRecipesStart,
    (state) => ({
      ...state,
      loading: true,
      apiError: null,
    })
  ),
  on(
    RecipeActions.fetchRecipesFailed,
    RecipeActions.saveRecipesFailed,
    (state, action) => ({
      ...state,
      loading: false,
      apiError: action.errorMessage,
    })
  ),
  on(RecipeActions.addRecipe, (state, action) => ({
    ...state,
    recipes: state.recipes.concat([action.recipe]),
  })),
  on(RecipeActions.updateRecipe, (state, { index, newRecipe }) => {
    const updatedRecipe = {
      ...state.recipes[index],
      ...newRecipe,
    };
    const newRecipes = state.recipes.map((v) => v);
    newRecipes[index] = updatedRecipe;

    return {
      ...state,
      recipes: newRecipes,
    };
  }),
  on(RecipeActions.deleteRecipe, (state, { index }) => {
    const recipes = state.recipes.map((v) => v);
    recipes.splice(index, 1);

    return {
      ...state,
      recipes,
    };
  })
);

export function recipeReducer(
  state: RecipesState,
  action: Action
): RecipesState {
  return _recipesReducer(state, action);
}
