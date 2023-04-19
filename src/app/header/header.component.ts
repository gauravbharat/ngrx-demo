import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

import * as RecipeActions from "../recipes/store/recipe.actions";
import * as AuthSelector from "../auth/store/auth.selector";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(AuthSelector.isAuthenticated);
  }

  onSaveData() {
    this.store.dispatch(RecipeActions.saveRecipesStart());
  }

  onFetchData() {
    this.store.dispatch(RecipeActions.fetchRecipesStart());
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
