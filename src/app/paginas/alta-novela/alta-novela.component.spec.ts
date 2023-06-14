import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaNovelaComponent } from './alta-novela.component';

describe('AltaNovelaComponent', () => {
  let component: AltaNovelaComponent;
  let fixture: ComponentFixture<AltaNovelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaNovelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaNovelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
