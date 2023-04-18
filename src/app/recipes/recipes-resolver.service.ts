import { Injectable, OnDestroy } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Recipe } from "./recipe.model";
import * as RecipeActions from "../recipes/store/recipe.actions";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

import { map, switchMap, take } from "rxjs/operators";

import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("recipes").pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipesStart());
          return this.actions$.pipe(
            ofType(RecipeActions.RecipeActionTypes.SET_RECIPES),
            take(1)
          );
        }

        return of(recipes);
      })
    );
  }
}
