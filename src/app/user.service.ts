import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080/user'
  constructor() { }

  async getUserByLogin(login: String): Promise<Object | undefined> {
    const data = await fetch(`${this.url}/${login}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaGFtYWRvcy1hcGkiLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxMzMyMzM1OX0.AFqrFFMVfAQB-dsaJvdltLdez4rpehsmGfmwHPXuooU',
        'Content-Type': 'application/json'
      }
    });

    const object = await data.json() ?? {};
    console.log(object)
    return object
  }
}
