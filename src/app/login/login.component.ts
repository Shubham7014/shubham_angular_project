// import { NgIf } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [NgIf],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent implements OnInit {
  
//   loginForm = new FormGroup({
//     email : new FormControl ('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required])
//   })

  
// ngOnInit() : void{
//   this.loginForm.valueChanges.subscribe((value) =>{
//     console.log('value', value )
//   })
// }

// onSubmit() {
//   console.log(this.loginForm.value)
// }

// }


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_servicies/authentication.service';
// import { ToastrService } from 'ngx-toastr';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
    standalone: true, 
    imports: [NgIf, NgClass, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule],
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  loading = false;
  submitted = false;
  returnUrl: string |any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    // private toastr: ToastrService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    //get return url from router
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submitted
    // this.toastr.clear();

    //stop if form invalid
    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f['username'].value, this.f['password'].value)
    .pipe(first())
    .subscribe(
      (data: any) => {
        this.router.navigate([this.returnUrl]);
      },
      (error: any) => {
        // this.toastr.error(error);
        this.loading = false;
      }
    );
  }

}