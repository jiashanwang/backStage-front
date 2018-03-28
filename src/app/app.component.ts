import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Body} from '@angular/http/src/body';
import "rxjs/Rx";
import {Headers, Http, RequestOptions} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  formModel:FormGroup;
  loginStatus:boolean;
  usernameIsExsit:boolean;
  passwordIsExsit:boolean;
  headers:Headers
  constructor(fb:FormBuilder,private http:Http,private router:Router) {

    this.formModel = fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  validatorUsername(){
    let username = this.formModel.get("username").value;
    let data = {username:username};
    let resultStream = this.http.post("/api/test/validatorUsername",data).map(res=>res.json());
    resultStream.subscribe({
      next:result=>{
        if(result.status == 1 && username){
          this.usernameIsExsit = false;
        }else {
          this. usernameIsExsit = true;
        }
      },
      error:error=>console.log(error)
    });

  }

  validatorPassword(){
    let password = this.formModel.get("password").value;
    let data ={password:password};
    this.headers.append("Content-Type","application/json");
    let resultStream = this.http.post("/api/test/validatorPassword",data).map(res=>res.json());
    resultStream.subscribe({
      next: res=>{
        console.log(res);
        console.log(res.status);
        if(res.status == 1 && password){
          this.passwordIsExsit = false;
        }else {
          this.passwordIsExsit = true;
        }
      },
      error:error=>console.log(error),
    })
  }

  // 登录
  onSubmit():any{
    // if(this.formModel.valid){
    //   let username = this.formModel.get("username").value;
    //   let password = this.formModel.get("password").value;
    //   let params = {username:username,password:password};
    //   let resultStream  = this.http.post("/api/test/login",params).map(res=>res.json());
    //   resultStream.subscribe(res=>console.log(res));
    //
    //
    // }


    this.loginStatus  = true;
      this.router.navigate(['/home']);



  }

  // 组件初始化
  ngOnInit() {
    this.usernameIsExsit =true;
    this.passwordIsExsit =true;
    this.headers = new Headers();


  }
}
