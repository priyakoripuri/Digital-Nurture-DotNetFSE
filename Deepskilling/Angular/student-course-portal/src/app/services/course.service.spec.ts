import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Basics', code: 'CS100', credits: 3 },
    { id: 2, name: 'Advanced React', code: 'CS200', credits: 4 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve courses from the API via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockCourses);
  });

  it('should handle a 500 error properly', () => {
    service.getCourses().subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error: Error) => {
        expect(error.message).toBe('Failed to load courses. Please try again.');
      }
    });

    // Request 1
    let req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // Request 2 (Retry 1)
    req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });

    // Request 3 (Retry 2)
    req = httpMock.expectOne('http://localhost:3000/courses');
    req.flush('Internal Server Error', { status: 500, statusText: 'Server Error' });
  });
});
