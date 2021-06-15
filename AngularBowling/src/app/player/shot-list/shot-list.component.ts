import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Frame } from 'src/app/model/frame';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css']
})
export class ShotListComponent implements OnInit, OnDestroy {
  DBinfos: Frame[]
  private scoreBoardSubscription: Subscription;
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.fetchData();
   }

  fetchData(): void {
    this.scoreBoardSubscription = this.playerService.getUpdatedScoreBoard()
      .subscribe(data => {
        this.DBinfos = data;
      })
  }

  ngOnDestroy() {
    this.scoreBoardSubscription.unsubscribe();
  }


}
