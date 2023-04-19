import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core.module";
import { LoggingService } from "./logging.service";
import { ActionReducer, MetaReducer, StoreModule } from "@ngrx/store";
import { appReducer } from "./store/app.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth/store/auth.effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "src/environments/environment";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { RecipeEffects } from "./recipes/store/recipe.effects";

// console.log all actions
export function logStateAndActions(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function (state, action) {
    const consoleLogColor = "background: #222; color: #bada55";
    const payload = (action as any).payload;
    console.group("%c NgRx", consoleLogColor);
    console.log("%c state", consoleLogColor, state);
    console.log("%c action type", consoleLogColor, action.type);
    payload && console.log("%c action payload", consoleLogColor, payload);
    console.groupEnd();

    return reducer(state, action);
  };
}

/** Developers can think of meta-reducers as hooks into the action->reducer pipeline.
 * Meta-reducers allow developers to pre-process actions before normal reducers are invoked.
 * Use the metaReducers configuration option to provide an array of meta-reducers that are composed from right to left.
 * Note: Meta-reducers in NgRx are similar to middleware used in Redux. */
export const metaReducers: MetaReducer<any>[] = [logStateAndActions];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer, { metaReducers }),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
