import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSuiviteComponent } from './fiche-suivite.component';

describe('FicheSuiviteComponent', () => {
  let component: FicheSuiviteComponent;
  let fixture: ComponentFixture<FicheSuiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheSuiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSuiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
