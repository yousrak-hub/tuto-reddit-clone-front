import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ListSubredditsComponent } from './list-subreddits/list-subreddits.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateSubredditComponent } from './create-subreddit/create-subreddit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-post',
    component: CreatePostComponent,canActivate:[AuthGuard]
  },
  {
    path: 'create-subreddit',
    component: CreateSubredditComponent,canActivate:[AuthGuard]
  },
  {
    path: 'list-subreddits',
    component: ListSubredditsComponent,
  },
  {
    path: 'view-post/:id',
    component: ViewPostComponent
  },
  {
    path: 'user-profile/:name',
    component: UserProfileComponent,canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
