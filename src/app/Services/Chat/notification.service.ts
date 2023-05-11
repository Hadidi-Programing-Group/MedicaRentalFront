import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  updateNotification = new EventEmitter()
  constructor() { }
}
