import { SubredditService } from './../service/subreddit.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubredditModel } from '../model/subreddit-response';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css'],
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  constructor(
    private router: Router,
    private subredditService: SubredditService
  ) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditModel = {
      name: '',
      description: '',
    };
  }

  ngOnInit(): void {}
  createSubreddit() {
    this.subredditModel.name=this.createSubredditForm.get('title').value;
    this.subredditModel.description=this.createSubredditForm.get('description').value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      throwError(error);
    })
  }
  discard() {
    this.router.navigateByUrl('/');
  }
}
