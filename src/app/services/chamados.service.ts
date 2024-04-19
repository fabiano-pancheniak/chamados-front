import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {
  constructor(private loginService: LoginService, private httpClient: HttpClient){ }

  getChamados(userId: String){
    const url = 'http://localhost:8080/chamado/'
    const headers = {
      "Authorization": `${this.loginService.token}`
    }
    return this.httpClient.get(`${url}${userId}`, {headers})
  }
}
