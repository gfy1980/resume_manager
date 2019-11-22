import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginQuitePage } from './login-quite.page';
import { TranslateModule }from "@ngx-translate/core";

const routes: Routes = [
  {
    path: '',
    component: LoginQuitePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginQuitePage]
})
export class LoginQuitePageModule {}
