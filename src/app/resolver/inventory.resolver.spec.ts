import { TestBed } from '@angular/core/testing';

import { InventoryResolver } from './inventory.resolver';

describe('InventoryResolver', () => {
  let resolver: InventoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InventoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
