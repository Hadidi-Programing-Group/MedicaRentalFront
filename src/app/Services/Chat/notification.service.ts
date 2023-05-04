import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  chatClicked = new EventEmitter()
  outChat = new EventEmitter()
  constructor() { }
}
