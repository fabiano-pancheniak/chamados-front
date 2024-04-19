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
  userId: String | null = ''

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

  async getUserIdd(token: String){
    var login = this.parseJwt(token).sub;
    const userUrl = `http://localhost:8080/user/userid/${login}`
    const headers = {
      "Authorization": `${token}`
    }
    const data = await fetch(userUrl, {headers});
    const {id} = await data.json() ?? {};
    this.userId = id
    console.log(userUrl)
    return id
  }

  getUserId(token: any){
    return this.parseJwt(token).sub
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
