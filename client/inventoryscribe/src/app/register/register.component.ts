import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../classes/user';
import {UserService} from '../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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

  resultRequest:String;
  user:User;
  constructor(private userService: UserService){

  }

  onSubmit() {
    this.user = this.userForm.value;
    this.userService.register(this.user).subscribe(
      (result) =>{
        var temp = JSON.stringify(result.Message)
        this.resultRequest = temp;
      },err =>{
        var temp = JSON.stringify(err.error.Message);
        this.resultRequest = temp;
      }
    );
  }

}
