import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNovelasComponent } from './tabla-novelas.component';

describe('TablaNovelasComponent', () => {
  let component: TablaNovelasComponent;
  let fixture: ComponentFixture<TablaNovelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaNovelasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaNovelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
