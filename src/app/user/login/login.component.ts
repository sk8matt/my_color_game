import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  loginResult$: Observable<User> | null = null;
  errorMessage = null;
  readonly destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmitForm() {
    const formValue = this.userForm.value;
    const credentials: Credentials = { email: formValue['email'], password: formValue['password'] }
    this.loginResult$ = this.userService.login(credentials);
    this.loginResult$.pipe(takeUntil(this.destroyed$)).subscribe(
      () => {
        this.router.navigate(['']);
      },
      err => {
        this.errorMessage = err
        console.log(err)
      }
    )
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
