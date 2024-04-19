import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = `http://localhost:8080/auth/login`
  token: String | null = sessionStorage.getItem('auth-token')
  role: String | null = null
  userLogin: String | null = ''

  constructor(private httpClient: HttpClient){ }

  login(login: any, password: any){
    return this.httpClient.post<LoginResponse>(this.url, {login, password}).pipe(
      tap((value: any) => {
        sessionStorage.setItem("auth-token", value.token)
        this.role = value.userRole
        console.log(this.role)
      })
    )
  }

  getUserId(){
    var login = this.parseJwt(this.token).sub;
    const userUrl = `http://localhost:8080/user/${login}`
    const headers = {
      "Authorization": `${this.token}`
    }
    return this.httpClient.get(userUrl, {headers})
  }


  parseJwt (token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
}
