import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoNovelasComponent } from './listado-novelas.component';

describe('ListadoNovelasComponent', () => {
  let component: ListadoNovelasComponent;
  let fixture: ComponentFixture<ListadoNovelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoNovelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoNovelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
