import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registro = ""
  private _login = "http://localhost:1313/NewUSer/LoginUser"

  constructor(private http: HttpClient) { }
 /* registeroUSer(user) {
    return this.http.post<any>(this._registro, user)
  }*/
  loginReq(user) {
    return this.http.post<any>(this._login, user)
  }
}
