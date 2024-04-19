import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  token = sessionStorage.getItem('auth-token')
  userId = this.loginService.getUserId(this.token)
  constructor(private loginService: LoginService, private httpClient: HttpClient){ }
  
  getChamadosByUser(){
    const url = 'http://localhost:8080/chamado'
    const headers = {
      "Authorization": `${this.token}`
    }
    if(this.token){
      return this.httpClient.get(`${url}/${this.userId}`, {headers: headers})
    }
    return
  }
}
