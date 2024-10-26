import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from '../environment/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private newPostSubject = new Subject<any>();
  private notificationSubject=new Subject<any>();

  constructor() { 
    this.socket = io(SERVER_URL);
    this.initializeListeners();
  }

  private initializeListeners() {
    this.socket.on('newPost', (post: any) => {
      this.newPostSubject.next(post);
    });
    this.socket.on('notification', (notification:any)=>{
      console.log("not: "+JSON.stringify(notification))
      this.notificationSubject.next(notification);
    })

    this.socket.on('error', (error: any) => {
      this.newPostSubject.error(error);
    });
  }

  listenToNewPosts(): Observable<any> {
    return this.newPostSubject.asObservable();
  }

  listenToNotifications(): Observable<any>{
    return this.notificationSubject.asObservable();
  }

  disconnect() {
    this.socket.disconnect();
  }

  reconnect() {
    this.socket.connect();
  }
}
