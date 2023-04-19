import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { map, switchMap } from "rxjs/operators";
import { Subscription } from "rxjs";
import * as RecipeActions from "../store/recipe.actions";
import * as ShopppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as RecipeSelectors from "../store/recipe.selector";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = +params["id"];

          return this.store.select(RecipeSelectors.recipes);
        }),
        map((recipes) => recipes.find((r, index) => index === this.id))
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onAddToShoppingList() {
    this.store.dispatch(
      ShopppingListActions.addIngredients({
        ingredients: this.recipe.ingredients,
      })
    );
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe({ index: this.id }));
    this.router.navigate(["/recipes"]);
  }

  ngOnDestroy(): void {
    this.sub && this.sub.unsubscribe();
  }
}
