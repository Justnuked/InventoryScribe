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

  constructor(private userService: UserService){

  }

  onSubmit() {
    var user = this.userForm.value;


    this.userService.register(user).subscribe(
      result =>{
        console.log(result);
      }
    );
  }

}
