import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModiferUserComponent } from './modifer-user.component';

describe('ModiferUserComponent', () => {
  let component: ModiferUserComponent;
  let fixture: ComponentFixture<ModiferUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModiferUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModiferUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
