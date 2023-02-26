import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAutoresComponent } from './tabla-autores.component';

describe('TablaAutoresComponent', () => {
  let component: TablaAutoresComponent;
  let fixture: ComponentFixture<TablaAutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaAutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
