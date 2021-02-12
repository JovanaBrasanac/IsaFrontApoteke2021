import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRecipeComponent } from './auth-recipe.component';

describe('AuthRecipeComponent', () => {
  let component: AuthRecipeComponent;
  let fixture: ComponentFixture<AuthRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
