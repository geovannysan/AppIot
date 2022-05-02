import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  USer = localStorage.getItem('name') || '';
  ionicForm: FormGroup;
  tiempoTranscurrido = Date.now();

  defaultDate = "1987-06-30";
  isSubmitted = false;
  constructor(public fb: FormBuilder, public _auth: AuthService, public router: Router) {

  }

  editorForm: FormGroup;
  ngOnInit() {
    this.ionicForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],

    })
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true
    })
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {

      return false;
    } else {
      this._auth.loginReq(this.ionicForm.value)
        .subscribe(
          res => {
            localStorage.setItem("token", res.token)
            localStorage.setItem("name", res.username)
            this.router.navigate(['/inicio'])
            console.log(res)
          },
          err => console.log(err)
        )
    }
  }
  loginUSer() {
    /* this._auth.loginReq(this.USer)
       .subscribe(
         res => {
           localStorage.setItem("token", res)
           console.log(res)
         },
         err => console.log(err)
       )*/
  }

}
