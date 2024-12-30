import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPointageComponent } from './modifier-pointage.component';

describe('ModifierPointageComponent', () => {
  let component: ModifierPointageComponent;
  let fixture: ComponentFixture<ModifierPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
