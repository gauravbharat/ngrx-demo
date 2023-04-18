import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as RecipeActions from "./recipe.actions";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipe.model";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.RecipeActionTypes.FETCH_RECIPES_START),
      exhaustMap(() => {
        return this.http
          .get<Recipe[]>("https://ng-max-recipe.firebaseio.com/recipes.json")
          .pipe(
            map((recipes) => {
              const transformedRecipes = recipes.map((recipe) => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : [],
                };
              });

              return new RecipeActions.SetRecipes({
                recipes: transformedRecipes,
              });
            }),
            catchError((error) => {
              let errorMessage = "Failed fetching recipes from server";

              return of(new RecipeActions.FetchRecipesFailed(errorMessage));
            })
          );
      })
    )
  );

  saveRecipes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.RecipeActionTypes.SAVE_RECIPES_START),
        withLatestFrom(this.store.select("recipes")),
        exhaustMap(([actionData, recipesState]) => {
          const recipes = recipesState.recipes;

          return this.http.put(
            "https://ng-max-recipe.firebaseio.com/recipes.json",
            recipes
          );
        })
      ),
    { dispatch: false }
  );
}
