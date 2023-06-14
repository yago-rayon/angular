import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCapitulosComponent } from './tabla-capitulos.component';

describe('TablaCapitulosComponent', () => {
  let component: TablaCapitulosComponent;
  let fixture: ComponentFixture<TablaCapitulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaCapitulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCapitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
