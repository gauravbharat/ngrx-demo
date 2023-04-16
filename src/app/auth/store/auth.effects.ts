import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from "../store/auth.actions";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { AuthService } from "../auth.service";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );

  console.log("AuthEffects : authSignup$ effect", { resData });

  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem("userData", JSON.stringify(user));

  // map rxjs operator automatically wrap what you return into an observable!!
  return new AuthActions.AuthSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate,
  });
};

const handleFailure = (e: HttpErrorResponse) => {
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

  console.log("AuthEffects : authSignup$ effect", {
    errorMessage,
  });

  localStorage.removeItem("userData");

  return of(new AuthActions.AuthFailed(errorMessage));
};

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
    private _router: Router,
    private _authService: AuthService
  ) {}

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.SIGNUP_START),
      exhaustMap((authData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}
    `,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) =>
              this._authService.setLogoutTimer(+resData.expiresIn * 1000)
            ),
            map((resData) => handleAuthentication(resData)),
            catchError((e: HttpErrorResponse) => handleFailure(e))
          );
      })
    )
  );

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
              tap((resData) =>
                this._authService.setLogoutTimer(+resData.expiresIn * 1000)
              ),
              map((resData) => handleAuthentication(resData)),
              catchError((e: HttpErrorResponse) => handleFailure(e))
            )
        );
      })
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.AUTH_SUCCESS),
        tap(() => {
          console.log(
            "AuthEffects : authSuccess$ effect - navigate to main page"
          );
          this._router.navigate(["/"]);
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AuthActionTypes.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          return new AuthActions.ClearError();
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          this._authService.setLogoutTimer(
            new Date(userData._tokenExpirationDate).getTime() -
              new Date().getTime()
          );

          return new AuthActions.AuthSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
          });
        }

        return new AuthActions.ClearError();
      })
    )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AuthActionTypes.LOGOUT),
        tap(() => {
          this._authService.clearLogoutTimer();
          localStorage.removeItem("userData");
          this._router.navigate(["/auth"], { replaceUrl: true });
        })
      ),
    { dispatch: false }
  );
}
