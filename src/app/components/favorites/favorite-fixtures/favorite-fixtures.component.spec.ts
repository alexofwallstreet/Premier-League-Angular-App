import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFixturesComponent } from './favorite-fixtures.component';

describe('FavoriteFixturesComponent', () => {
  let component: FavoriteFixturesComponent;
  let fixture: ComponentFixture<FavoriteFixturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteFixturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFixturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
