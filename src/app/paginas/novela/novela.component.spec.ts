import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovelaComponent } from './novela.component';

describe('NovelaComponent', () => {
  let component: NovelaComponent;
  let fixture: ComponentFixture<NovelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovelaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
