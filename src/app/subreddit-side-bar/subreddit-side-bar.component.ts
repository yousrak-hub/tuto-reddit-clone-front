import { SubredditService } from './../service/subreddit.service';
import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../model/subreddit-response';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css'],
})
export class SubredditSideBarComponent implements OnInit {
  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean = false;
  constructor(private subredditService: SubredditService) {}

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe((data) => {
      if (data.length >= 4) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
        this.displayViewAll = false;
      }
    });
  }
}
