import { TestBed } from '@angular/core/testing';

import { GraphsServiceService } from './graphs-service.service';

describe('GraphsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphsServiceService = TestBed.get(GraphsServiceService);
    expect(service).toBeTruthy();
  });
});
