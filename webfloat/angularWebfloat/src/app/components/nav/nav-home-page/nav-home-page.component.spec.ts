import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHomePageComponent } from './nav-home-page.component';

describe('NavHomePageComponent', () => {
  let component: NavHomePageComponent;
  let fixture: ComponentFixture<NavHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
