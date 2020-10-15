import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogingService {

  constructor(private httpClient: HttpClient) { }

  public logearUsr(email: string, pass: string) {
    let usr_pass = {
      email: email,
      password: pass
    };
    return this.httpClient.post("http://192.168.1.103:3000/login", usr_pass);
  };
  
}
