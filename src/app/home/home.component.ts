import { PostService } from './../service/post.service';
import { Component, OnInit } from '@angular/core';
import { PostModel } from '../model/post-model';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Array<PostModel> = [];
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe((post) => {
      this.posts = post;
    });
  }

  ngOnInit(): void {}
}
