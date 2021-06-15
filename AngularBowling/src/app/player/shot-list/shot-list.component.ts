import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Frame } from 'src/app/model/frame';
import { PlayerService } from 'src/app/shared/player.service';
import { PieChart } from 'src/app/charts/pie-chart';
import { BarChart } from 'src/app/charts/bar-chart';

@Component({
  selector: 'app-shot-list',
  templateUrl: './shot-list.component.html',
  styleUrls: ['./shot-list.component.css']
})
export class ShotListComponent implements OnInit, OnDestroy {
  DBinfos: Frame[];
  pieChart = new PieChart();
  barChart = new BarChart();
  scoreBoardSubscription: Subscription;
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.fetchData();
   }

  fetchData(): void {
    this.scoreBoardSubscription = this.playerService.getUpdatedScoreBoard()
      .subscribe(data => {
        this.DBinfos = data;
        this.pieChart.chartData = this.pieChart.fillData(this.DBinfos)
        this.barChart.barChartData[0].data = this.barChart.fillData(this.DBinfos)
      })
  }

  ngOnDestroy() {
    this.scoreBoardSubscription.unsubscribe();
  }


}
