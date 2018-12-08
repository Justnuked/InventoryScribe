import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { RegisterComponent} from './register/register.component';
import { CommonModule } from '@angular/common';
import  {LoginComponent}  from './login/login.component';
import {CharacterComponent} from './character/character.component';

const routes : Routes = [
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path: 'characters', component: CharacterComponent}
];

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
