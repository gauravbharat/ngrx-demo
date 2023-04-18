import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { HttpClientModule } from "@angular/common/http";

import * as fromApp from "../store/app.reducer";
import { Store, StoreModule } from "@ngrx/store";

describe("Component: Header", () => {
  let headerInstance: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, StoreModule.forRoot(fromApp.appReducer)],
    });

    store = TestBed.get(Store);
    // spyOn(store, "select").and.callThrough();

    fixture = TestBed.createComponent(HeaderComponent);
    headerInstance = fixture.componentInstance;
    // fixture.detectChanges()
  });

  it("should create header component", () => {
    expect(headerInstance).toBeTruthy();
  });

  it("should have brand name displaye on header", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".navbar-brand").textContent).toContain(
      "Recipe Book"
    );
  });

  // it("should select auth state when created", () => {
  //   expect(store.select).toHaveBeenCalledWith("auth");
  // });
});
