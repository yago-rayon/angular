import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSeguidasComponent } from './mis-seguidas.component';

describe('MisSeguidasComponent', () => {
  let component: MisSeguidasComponent;
  let fixture: ComponentFixture<MisSeguidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisSeguidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisSeguidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
