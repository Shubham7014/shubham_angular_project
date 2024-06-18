import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';

import { User } from '../_models/user';
import { globals } from './globals';
// import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient,
    //  private toastr: ToastrService
  ) {
    const currentUserJson = localStorage.getItem('currentUser');
    const initialUser = currentUserJson ? JSON.parse(currentUserJson) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);

    // this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || ''));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(globals + 'api/login', { username, password })
      .pipe(map(user => {
        // store user details jwt token in localStorage
        // if (typeof localStorage !== 'undefined') {

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
        // }

      }));
  }

  logout() {
    //remove user from localStorage
    // if (typeof localStorage !== 'undefined') {

    localStorage.removeItem('currentUser');
    // this.toastr.success("Successfully Logout");
    this.currentUserSubject.next(null);
    // }
  }
}