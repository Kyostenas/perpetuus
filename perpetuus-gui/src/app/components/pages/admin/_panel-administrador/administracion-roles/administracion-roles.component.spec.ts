import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionRolesComponent } from './administracion-roles.component';

describe('AdministracionRolesComponent', () => {
  let component: AdministracionRolesComponent;
  let fixture: ComponentFixture<AdministracionRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
