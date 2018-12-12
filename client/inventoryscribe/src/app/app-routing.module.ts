import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { RegisterComponent} from './register/register.component';
import { CommonModule } from '@angular/common';
import  {LoginComponent}  from './login/login.component';
import {CharacterComponent} from './character/character.component';
import {NewCharacterFormComponent} from './new-character-form/new-character-form.component';
import {CharacterDetailComponent} from './character-detail/character-detail.component';
import {NewInventoryFormComponent} from './new-inventory-form/new-inventory-form.component';
import {NewItemFormComponent} from './new-item-form/new-item-form.component';
import {UpdateItemFormComponent} from './update-item-form/update-item-form.component';

const routes : Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path: 'characters', component: CharacterComponent},
  {path: 'characters/newcharacter', component:NewCharacterFormComponent},
  {path: 'characters/:id', component:CharacterDetailComponent,
      children:[
        {path: 'newinventory', component:NewInventoryFormComponent},
        {path: 'newitem/:invid', component:NewItemFormComponent},
        {path: 'updateitem/:invid/:itemid', component:UpdateItemFormComponent}
      ]}
];

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
