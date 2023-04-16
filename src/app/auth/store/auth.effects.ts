import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "../store/auth.actions";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

/** organise effects in JS classes into file as xyz.effects.ts
 * add @Injectable decorator from @angular/core so that dependencies can be injected in the effects class constructor
 * an effect, by default, should ALWAYS return a new action at the end when its done because an effect itself does not change any state.
 * It just executes its side-effect code/logic and nowhere the reducer or NgRx state is touched.
 * No need to DISPATCH a new action since createEffect has a return value of a new action observable
 */

@Injectable()
export class AuthEffects {
  /** inject Actions observable from ngrx effects package
   * - get access to stream of dispatched actions
   * - decide on what to do on a particular action, apart from any data/state update logic for it in the reducer
   * - do not change any state for that action effect since it should be handled in a reducer
   * - do not subscribe to Actions observable since NgRx effects would subscribe to it
   * - use ofType rxjs operator provided by NgRx effects lib to filter the desired dispatched action/effect
   */
  constructor(
    private readonly actions$: Actions,
    private http: HttpClient,
    private _router: Router
  ) {}

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.LOGIN_START),
      exhaustMap((authData: AuthActions.LoginStart) => {
        return (
          this.http
            .post<AuthResponseData>(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}
    `,
              {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true,
              }
            )
            // IMPORTANT!!!
            // actions observable is a continuous observable stream and it won't react to changes (and die down) if the switchMap effect action throws an error or (subscription completes if subscribed here).
            // Hence, handle effect action observable error into another observable pipe and RETURN a NON-ERROR observable to the outer action$ observable stream (pipe)
            .pipe(
              map((resData) => {
                const expirationDate = new Date(
                  new Date().getTime() + +resData.expiresIn * 1000
                );

                console.log("AuthEffects : authLogin$ effect", { resData });

                // map rxjs operator automatically wrap what you return into an observable!!
                return new AuthActions.Login({
                  email: resData.email,
                  userId: resData.localId,
                  token: resData.idToken,
                  expirationDate,
                });
              }),
              catchError((e: HttpErrorResponse) => {
                let errorMessage = "An unknown error occurred!";

                switch (e.error.error.message) {
                  case "EMAIL_EXISTS":
                    errorMessage = "This email exists already";
                    break;
                  case "EMAIL_NOT_FOUND":
                    errorMessage = "This email does not exist.";
                    break;
                  case "INVALID_PASSWORD":
                    errorMessage = "This password is not correct.";
                    break;
                }

                console.log("AuthEffects : authLogin$ effect", {
                  errorMessage,
                });

                return of(new AuthActions.LoginFailed(errorMessage));
              })
            )
        );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.LOGIN),
        tap(() => {
          console.log(
            "AuthEffects : authSuccess$ effect - navigate to recipes"
          );
          this._router.navigate(["/recipes"]);
        })
      ),
    { dispatch: false }
  );
}
