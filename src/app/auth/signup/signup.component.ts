import { AuthService } from './../../service/auth.service';
import { SignupRequestPayload } from '../../model/signup.request.payload';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  signup() {
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.authService.singup(this.signupRequestPayload).subscribe(
      () => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      () => {
        this.toaster.error('Registration failed! Please try agin');
      }
    );
  }
}
