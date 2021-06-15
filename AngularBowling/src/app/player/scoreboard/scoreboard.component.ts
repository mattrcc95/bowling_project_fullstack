import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Frame } from 'src/app/model/frame';
import { PlayerService } from 'src/app/shared/player.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  DBinfos: Frame[];
  private scoreBoardSubscription: Subscription;
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.scoreBoardSubscription = this.playerService.getUpdatedScoreBoard()
      .subscribe(data => {
        this.DBinfos = data;
        this.displayScoreboard(this.DBinfos)
      })
  }

  displayScoreboard(DBinfos: Frame[]) {
    if (DBinfos.length >= 1) {
      for (var i = 0; i < DBinfos.length; ++i) {

        var flag = <HTMLInputElement>document.getElementById("flag" + (i + 1).toString());
        flag.innerHTML = '<h6>' + DBinfos[i].flag + '</h6>'
        this.assignFlag(flag)

        var score = <HTMLInputElement>document.getElementById("score" + (i + 1).toString());
        score.innerHTML = '<h4>' + DBinfos[i].score.toString() + '</h4>'

      }
    } else {
      this.resetScoreBoard()
    }
  }

  resetScoreBoard() {
    for (var i = 0; i < 10; ++i) {
      var flag = <HTMLInputElement>document.getElementById("flag" + (i + 1).toString());
      flag.innerHTML = ""
      flag.classList.remove("strike")
      flag.classList.remove("spare")

      var score = <HTMLInputElement>document.getElementById("score" + (i + 1).toString());
      score.innerHTML = ""
    }
  }

  assignFlag(flag: HTMLInputElement) {
    if(flag.innerHTML.includes("- /")){
      flag.classList.add("spare")
    }
    if (flag.innerHTML.includes("X")) {
      console.log("aaa")
      flag.classList.remove("spare")
      flag.classList.add("strike")
    }
  }


  ngOnDestroy() {
    this.scoreBoardSubscription.unsubscribe();
  }

}
