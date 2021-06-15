import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PinsComponent } from './player/pins/pins.component';
import { ScoreboardComponent } from './player/scoreboard/scoreboard.component';
import { ShotListComponent } from './player/shot-list/shot-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PinsComponent,
    ScoreboardComponent,
    ShotListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
