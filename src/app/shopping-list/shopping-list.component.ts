import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";

import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";
import * as ShoppingListSelectors from "./store/shopping-list.selector";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.ingredients$ = this.store.select(ShoppingListSelectors.ingredients);

    this.loggingService.printLog("Hello from ShoppingListComponent ngOnInit!");
  }

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }
}
