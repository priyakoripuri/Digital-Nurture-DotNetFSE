import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Course } from '../../models/course.model';
import { By } from '@angular/platform-browser';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Angular Architecture', code: 'ANG101', credits: 4 },
    { id: 2, name: 'RxJS Masterclass', code: 'RXJS200', credits: 3 }
  ];

  const initialState = {
    course: {
      courses: mockCourses,
      loading: false,
      error: null
    },
    enrollment: {
      enrolledCourseIds: []
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseListComponent, RouterTestingModule],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render course cards based on the mock store state', () => {
    fixture.detectChanges(); // Trigger initial change detection
    
    const courseCards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(courseCards.length).toBe(2);
  });

  it('should display the loading indicator when state loading is true', () => {
    // Simulate loading true
    store.setState({
      ...initialState,
      course: {
        ...initialState.course,
        loading: true
      }
    });

    fixture.detectChanges();

    // Verify loading text appears
    expect(fixture.nativeElement.textContent).toContain('Loading courses...');
  });
});
