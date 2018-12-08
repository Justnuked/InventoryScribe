import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../classes/user';
import {UserService} from '../services/user.service'
import {JwtService} from '../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  userForm = new FormGroup({
    username: new FormControl('',
    Validators.required),
    password: new FormControl('',
    Validators.required)
  });

  get username(){
    return this.userForm.get('username');
  }

  get password(){
    return this.userForm.get('password');
  }

  user:User;
  resultRequest:String;
  constructor(private userService: UserService, private jwtService:JwtService){

  }

  onSubmit() {

    this.user = this.userForm.value;


    this.userService.login(this.user).subscribe(
      (result) =>{
        var temp = JSON.stringify(result.token);
        this.jwtService.setJwtToken(temp);

        this.resultRequest = "Succes";
      },err =>{
        var temp = JSON.stringify(err.error.Message);
        this.resultRequest = temp;
      }
    );
  }

}
