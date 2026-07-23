import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseCardComponent } from './course-card';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Course } from '../../models/course.model';
import { SimpleChanges, SimpleChange } from '@angular/core';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let store: MockStore;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCardComponent],
      providers: [
        provideMockStore({ initialState: { enrollment: { enrolledCourseIds: [] } } })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    // We must manually assign the required @Input for the component to be valid before detectChanges
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render course name correctly from @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.course-title')).nativeElement;
    expect(titleElement.textContent).toContain('Data Structures');
  });

  it('should emit course id when enrollRequested is triggered via onEnrollClick', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    // Simulate clicking the enroll/unenroll button.
    // The button delegates to onEnrollClick().
    // We just call the method directly to verify the output emitter.
    component.onEnrollClick();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });
  it('should test ngOnChanges and spy on console.log', () => {
    spyOn(console, 'log');
    
    const changes: SimpleChanges = {
      course: new SimpleChange(null, mockCourse, true)
    };
    
    component.ngOnChanges(changes);
    
    expect(console.log).toHaveBeenCalledWith('Course input changed', mockCourse);
  });
});
