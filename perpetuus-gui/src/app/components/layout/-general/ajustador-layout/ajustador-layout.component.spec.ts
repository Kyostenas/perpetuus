import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustadorLayoutComponent } from './ajustador-layout.component';

describe('AjustadorLayoutComponent', () => {
  let component: AjustadorLayoutComponent;
  let fixture: ComponentFixture<AjustadorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustadorLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjustadorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
