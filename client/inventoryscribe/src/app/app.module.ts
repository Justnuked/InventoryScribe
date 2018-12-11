import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {MatMenuModule, MatExpansionModule ,MatSnackBarModule, MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material'
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CharacterComponent } from './character/character.component';
import { NewCharacterFormComponent } from './new-character-form/new-character-form.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NewInventoryFormComponent } from './new-inventory-form/new-inventory-form.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { UpdateItemFormComponent } from './update-item-form/update-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    CharacterComponent,
    NewCharacterFormComponent,
    CharacterDetailComponent,
    InventoryComponent,
    NewInventoryFormComponent,
    NewItemFormComponent,
    UpdateItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
