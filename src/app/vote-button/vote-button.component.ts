import { ToastrService } from 'ngx-toastr';
import { PostService } from './../service/post.service';
import { AuthService } from './../service/auth.service';
import { VoteService } from './../service/vote.service';
import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../model/post-model';
import { VotePayload } from '../model/vote-payload';
import { throwError } from 'rxjs';
import { VoteType } from '../model/vote-type';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css'],
})
export class VoteButtonComponent implements OnInit {
  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,
    private toastrService: ToastrService
  ) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined,
    };
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.updateVoteDetails();
  }
  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(
      () => {
        this.updateVoteDetails();
      },
      (error) => {
        this.toastrService.error("Error Occured");
        throwError(error);
      }
    );
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe((post) => {
      this.post = post;
    });
  }
}
