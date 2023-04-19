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

import { map, switchMap, take, takeLast } from "rxjs/operators";

import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import * as RecipeSelectors from "./store/recipe.selector";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<{ recipes: Recipe[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(RecipeSelectors.recipes).pipe(
      take(1),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          console.log(
            "RecipesResolverService : about to dispatch RecipeActions.fetchRecipesStart()"
          );
          this.store.dispatch(RecipeActions.fetchRecipesStart());
          return this.actions$.pipe(ofType(RecipeActions.setRecipes), take(1));
        }

        return of({ recipes });
      })
    );
  }
}
