import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquePointagesComponent } from './historique-pointages.component';

describe('HistoriquePointagesComponent', () => {
  let component: HistoriquePointagesComponent;
  let fixture: ComponentFixture<HistoriquePointagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquePointagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquePointagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
