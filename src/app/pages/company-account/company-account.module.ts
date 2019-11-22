import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompanyAccountPage } from './company-account.page';
import { TranslateModule }from "@ngx-translate/core";
const routes: Routes = [
  {
    path: '',
    component: CompanyAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [CompanyAccountPage]
})
export class CompanyAccountPageModule {}
