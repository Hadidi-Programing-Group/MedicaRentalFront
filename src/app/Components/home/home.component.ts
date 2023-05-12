import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showAds = true
  show(show: boolean)
  {
    this.showAds = show;
  }
}
