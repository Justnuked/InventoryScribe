import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { RegisterComponent} from './register/register.component';
import { CommonModule } from '@angular/common';

const routes : Routes = [
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
