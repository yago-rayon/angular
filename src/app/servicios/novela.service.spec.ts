import { TestBed } from '@angular/core/testing';

import { NovelaService } from './novela.service';

describe('NovelaService', () => {
  let service: NovelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
