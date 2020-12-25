import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'alicks';
  toggle = () => {
    if (this.title === 'alicks'){
      this.title = 'skcila'
    }else {
      this.title='alicks'
    }
  }
}
