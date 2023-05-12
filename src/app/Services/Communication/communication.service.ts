import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private isVisibleSource = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isVisibleSource.asObservable();
  isVisible = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.isVisibleSource.next(this.isVisible);
  }
}
