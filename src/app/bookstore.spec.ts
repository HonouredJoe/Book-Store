import { TestBed } from '@angular/core/testing';

import { Bookstore } from './bookstore';

describe('Bookstore', () => {
  let service: Bookstore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bookstore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
