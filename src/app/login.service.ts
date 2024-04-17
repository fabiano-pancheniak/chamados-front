import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: String = `http://localhost:8080/auth/login`
  token: String | null = ''

  async login(login: string, password: string): Promise<string | undefined> {
    const body = {
      login: login,
      password: password
    };

    const data = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const {token} = await data.json();
    this.token = token
    return token;
  }

}
