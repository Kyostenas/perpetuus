import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoDesplegableComponent } from './elemento-desplegable.component';

describe('ElementoDesplegableComponent', () => {
  let component: ElementoDesplegableComponent;
  let fixture: ComponentFixture<ElementoDesplegableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementoDesplegableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementoDesplegableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
