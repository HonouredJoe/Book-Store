import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Bookstore } from './bookstore';

describe('Bookstore', () => {
  let service: Bookstore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(Bookstore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books from the backend API', () => {
    const books = [{ id: 1, title: 'Angular Basics' }];
    let result: any[] = [];

    service.getAllBooks().subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne('http://localhost:8080/api/books');
    expect(req.request.method).toBe('GET');
    req.flush(books);

    expect(result).toEqual(books);
  });

  it('should keep the list empty when backend returns an error', () => {
    service.loadBooks();

    const req = httpMock.expectOne('http://localhost:8080/api/books');
    req.flush('Server error', { status: 500, statusText: 'Server Error' });

    expect(service.books()).toEqual([]);
  });
});
