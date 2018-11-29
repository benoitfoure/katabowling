import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'katabowling';
  line = [];
  currentFrame = [0, 0, 0];
  end = false;
  maxlength = 10;
  maxpins = 10;

  addLine() {
    this.line.push(this.currentFrame);
    this.currentFrame = [0, 0, 0];
    if (this.line.length === this.maxlength) {
      this.end = true;
    }
  }

  reset() {
    this.line = [];
    this.currentFrame = [0, 0, 0];
    this.end = false;
  }

  getScore() {
    let total = 0;
    this.line.forEach(frame  => {
      // Is it the last frame ?
      if (this.line.indexOf(frame) === this.maxlength - 1) {
        total = total + frame[0] + frame[1] + frame[2];
      }
      // It is not the last frame
      else {
        // case 1: strike
        if (frame[0] === this.maxpins) {
          const nextFrame = this.line.indexOf(frame) + 1;
          // if next frame is the last:
          if (nextFrame + 1 === this.maxlength) {
            total = total + 10 + this.line[nextFrame][0] + this.line[nextFrame][1];
          }
          // if next frame is a strike
          else if (this.line[nextFrame][0] === this.maxpins) {
            total = total + 10 + this.line[nextFrame][0] + this.line[nextFrame + 1][0];
          }
          // default
          else {
            total = total + 10 + this.line[nextFrame][0] + this.line[nextFrame][1];
          }
        }
        // case 2: spare
        else if (frame[0] + frame[1] === this.maxpins) {
          const nextFrame = this.line.indexOf(frame) + 1;
          total = total + 10 + this.line[nextFrame][0];
        }
        // case 3: default
        else {
          total = total + frame[0] + frame[1];
        }

      }
    });
    return total;
  }
}
