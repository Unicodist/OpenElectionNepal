import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {VoteChoiceModel} from './models/vote.choice.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly titleText = signal('नेपाल निर्वाचन');
  voteChoices = signal<VoteChoiceModel[]>([])

  constructor(private title: Title) { }
  ngOnInit() {
    this.title.setTitle(this.titleText())
  }
}
