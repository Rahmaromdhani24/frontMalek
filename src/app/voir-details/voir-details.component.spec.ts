import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirDetailsComponent } from './voir-details.component';

describe('VoirDetailsComponent', () => {
  let component: VoirDetailsComponent;
  let fixture: ComponentFixture<VoirDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoirDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
