import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Frame } from '../model/frame';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = 'http://localhost:8080/api/player/game';
  private scoreBoardSubject = new Subject<any>();
  private trySub = new Subject<any>();
  private shotList: Frame[];

  constructor(private http: HttpClient) { }

  addRoll(shot: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/roll`, shot);
  }

  getScoreBoard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/scoreboard`);
  }

  deleteGame(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/scoreboard`)
  }

  getLastFrame(): Observable<any> {
    return this.http.get(`${this.baseUrl}/frame`)
  }

  //the component that wants to update something (pins-component), calls this fn
  sendUpdatedScoreBoard() {
    this.getScoreBoard().subscribe(data => {
      this.shotList = data;
      this.scoreBoardSubject.next(this.shotList); 
    });
  }

  //the receiver component (shot-list-component, scoreboard-component) calls this fn
  getUpdatedScoreBoard(): Observable<any> {
    return this.scoreBoardSubject.asObservable(); //it returns as an observable to which the receiver function will subscribe
  }


}
