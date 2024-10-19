import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() { 
    this.socket=io(SERVER_URL);
  }

  listenToNewPosts(){
    return new Observable((observer)=>{
      this.socket.on('newPost', (post:any)=>{
        observer.next(post);
      })
      this.socket.on('error',(error)=>{
        observer.error(error);
      })

      return ()=>{
        this.socket.off('newPost');
        this.socket.off('error');
      }
    })
  }

}
