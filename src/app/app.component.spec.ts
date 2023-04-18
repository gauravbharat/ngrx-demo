import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { LoggingService } from "./logging.service";
import * as fromApp from "./store/app.reducer";
import * as AuthActions from "./auth/store/auth.actions";
import { HttpClientModule } from "@angular/common/http";

import { Store, StoreModule } from "@ngrx/store";

describe("AppComponent", () => {
  let appInstance: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot(fromApp.appReducer),
      ],
      providers: [LoggingService],
    });
    // TestBed.compileComponents();
    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();

    fixture = TestBed.createComponent(AppComponent);
    appInstance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it("should create the app", async(() => {
    expect(appInstance).toBeTruthy();
  }));

  it("should dispatch an action auto-login when created", () => {
    const action = new AuthActions.AutoLogin();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
