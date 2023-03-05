import { TestBed } from '@angular/core/testing';

import { LocationsResolver } from './locations.resolver';

describe('LocationsResolver', () => {
  let resolver: LocationsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LocationsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
