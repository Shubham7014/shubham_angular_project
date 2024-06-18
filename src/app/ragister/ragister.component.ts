// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ragister',
//   standalone: true,
//   imports: [],
//   templateUrl: './ragister.component.html',
//   styleUrl: './ragister.component.css'
// })
// export class RagisterComponent {

// }

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_servicies/authentication.service';
import { UserService } from '../_servicies/user.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [NgIf, NgClass, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule],
    templateUrl: './ragister.component.html',
  styleUrl: './ragister.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    // private toastrService: ToastrService
  ) {
    // redirect to home if logged in
    if(this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //convenience getter 
  f:any = {
  get: () => { return this.registerForm.controls; }
  }

  onSubmit() {
    this.submitted = true;

    //stop if form invalid
    if(this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
      (      data: any) => {
        // this.toastrService.success('Registration success');
        this.router.navigate(['/login']);
      },
      (      error: any) => {
        // this.toastrService.error(error);
        this.loading = false;
      }
    );
  }

}
