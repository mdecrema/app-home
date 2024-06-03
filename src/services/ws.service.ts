import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private socket: WebSocket;
  private messageSubject: Subject<any>;

  constructor() {
    this.messageSubject = new Subject<any>();
    this.socket = {} as any
  }

  public connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.messageSubject.next(event.data);
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };
  }

  public sendMessage(message: any): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Ready state:', this.socket.readyState);
    }
  }

  public getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
  // socket: any;

  //   constructor() {
  //       this.socket = io.connect('wss://whale-app-3wbzf.ondigitalocean.app');
  //   }

  //   public listen(eventname: string): Observable<any> {
  //       return new Observable((subscriber) => {
  //           this.socket.on(eventname, (data: any) => {
  //               subscriber.next(data);
  //           })
  //       })
  //   }

  //   public emit(eventname: string, data: any) {
  //       this.socket.emit(eventname, data);
  //   }
}
