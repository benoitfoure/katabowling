import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'katabowling'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('katabowling');
  });

  it('should initialize score to 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const score = app.getScore();
    expect(score).toEqual(0);
  });

  it('should score the number of hits in the frame in case of no strike or spare', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[3, 2, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const score = app.getScore();
    expect(score).toEqual(5);
  });

  it('should add the number of hits of the next 2 rolls to the frame score in case of strike', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[10, 0, 0], [3, 2, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const score = app.getScore();
    expect(score).toEqual(20);
  });

  it('should add the number of hits of the 3 rolls in case of strike at the last frame', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [10, 10, 10]];
    const score = app.getScore();
    expect(score).toEqual(30);
  });

  it('should add the number of hits of the next roll to the frame score in case of spare', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[5, 5, 0], [3, 2, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const score = app.getScore();
    expect(score).toEqual(18);
  });

  it('should add the number of hits of the 3 rolls in case of spare at the last frame', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [5, 5, 10]];
    const score = app.getScore();
    expect(score).toEqual(20);
  });

  it('should give 300 point to a full strikes series', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 0, 0], [10, 10, 10]];
    const score = app.getScore();
    expect(score).toEqual(300);
  });

  it('should give 150 point to a series of 5-hit tries', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 0], [5, 5, 5]];
    const score = app.getScore();
    expect(score).toEqual(150);
  });

  it('should give 90 point to a series of 9+0 frames', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0]];
    const score = app.getScore();
    expect(score).toEqual(90);
  });

  it('should rest the line when a new game is launched', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.line = [[9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0], [9, 0, 0]];
    app.reset();
    expect(app.line.length).toEqual(0);
  });

});
