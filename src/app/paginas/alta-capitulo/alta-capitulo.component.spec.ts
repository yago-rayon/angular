import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCapituloComponent } from './alta-capitulo.component';

describe('AltaCapituloComponent', () => {
  let component: AltaCapituloComponent;
  let fixture: ComponentFixture<AltaCapituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaCapituloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaCapituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
