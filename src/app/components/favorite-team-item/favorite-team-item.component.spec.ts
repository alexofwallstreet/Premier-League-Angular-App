import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeamItemComponent } from './favorite-team-item.component';

describe('FavoriteTeamItemComponent', () => {
  let component: FavoriteTeamItemComponent;
  let fixture: ComponentFixture<FavoriteTeamItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteTeamItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTeamItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
