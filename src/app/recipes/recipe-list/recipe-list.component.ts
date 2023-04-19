import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import * as RecipeSelectors from "../store/recipe.selector";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipes = this.store.select(RecipeSelectors.recipes);
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
