import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Frame } from 'src/app/model/frame';
import { PlayerService } from 'src/app/shared/player.service'

const bound = 10;

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css']
})
export class PinsComponent implements OnInit {
  private lastFrame: Frame
  private threshold: number

  constructor(private playerService: PlayerService) { }
  ngOnInit(): void { }

  addRoll_And_UpdateScoreBoard(shot: number) {
    this.playerService.addRoll(shot)
    .subscribe(data => {
      console.log("roll added to DB")
      this.playerService.sendUpdatedScoreBoard(); //send scoreboard updates to scoreboard-component and shot-list component
      this.setThreshold()
    })
  }

  activateThreshold(threshold: number) {
    if (threshold < 10) {
      for (var i = threshold + 1 ; i <= bound; ++i) {
        var btn = <HTMLInputElement> document.getElementById(i.toString());
        btn.hidden = true;
      }
    } else {
      for (var i = 0; i <= bound; ++i) {
        var btn = <HTMLInputElement> document.getElementById(i.toString());
        btn.hidden = false;
      }
    }
  }

  deleteGame(){
    this.playerService.deleteGame()
      .subscribe( data =>{
        this.playerService.sendUpdatedScoreBoard(); //send scoreboard updates to scoreboard-component and shot-list component
        this.activateThreshold(10);
      })
  }

  setThreshold() {
    this.playerService.getLastFrame()
      .subscribe(data => {
        this.lastFrame = data;
        this.threshold = this.getThresold(this.lastFrame)
        this.activateThreshold(this.threshold)
      })
  }

  getThresold(lastFrame: Frame): number {
    var frameShots = this.fillShotArray(lastFrame)
    var threshold: number = 0;

    if (frameShots.length === 0)
      threshold = bound

    if (lastFrame.id < 10) {
      if (frameShots.length === 1)
        if (frameShots[0] < 10)
          threshold = bound - frameShots[0]
        else
          threshold = bound
      else
        threshold = bound
    } else {
      if (frameShots.length === 1) {
        if (frameShots[0] < 10)
          threshold = bound - frameShots[0]
        else
          threshold = bound
      } else {
        if (frameShots[0] + frameShots[1] < 10) {
          threshold = -1
        } else {
          if (frameShots.length == 2)
            if (frameShots[1] == 10 || frameShots[0] + frameShots[1] == 10)
              threshold = bound
            else
              threshold = bound - frameShots[1]
          else
            threshold = -1
        }
      }
    }
    return threshold
  }

  fillShotArray(frame: Frame): number[] {
    var frameShots: number[] = new Array()
    if (frame.shot1 != null)
      frameShots.push(frame.shot1)
    if (frame.shot2 != null)
      frameShots.push(frame.shot2)
    if (frame.shot3 != null)
      frameShots.push(frame.shot3)
    return frameShots
  }

}
