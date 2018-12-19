import { TestBed } from '@angular/core/testing';

import { ProductSaveService } from './product-save.service';

describe('ProductSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSaveService = TestBed.get(ProductSaveService);
    expect(service).toBeTruthy();
  });
});
