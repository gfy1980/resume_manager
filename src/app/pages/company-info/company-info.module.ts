import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CompanyInfoPage } from './company-info.page';
import { TranslateModule }from "@ngx-translate/core";
const routes: Routes = [
  {
    path: '',
    component: CompanyInfoPage
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
  declarations: [CompanyInfoPage]
})
export class CompanyInfoPageModule {}
