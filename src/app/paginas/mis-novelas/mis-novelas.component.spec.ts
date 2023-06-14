import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisNovelasComponent } from './mis-novelas.component';

describe('MisNovelasComponent', () => {
  let component: MisNovelasComponent;
  let fixture: ComponentFixture<MisNovelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisNovelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisNovelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
