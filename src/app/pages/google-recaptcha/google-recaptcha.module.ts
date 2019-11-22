import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoogleRecaptchaPage } from './google-recaptcha.page';
import { TranslateModule }from "@ngx-translate/core";
import {
  RECAPTCHA_SETTINGS,
  RecaptchaLoaderService,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';

const routes: Routes = [
  {
    path: '',
    component: GoogleRecaptchaPage
  }
];
const globalSettings: RecaptchaSettings = { siteKey: '6LcOuyYTAAAAAHTjFuqhA52fmfJ_j5iFk5PsfXaU' };
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    RecaptchaModule
  ],
  declarations: [GoogleRecaptchaPage],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: globalSettings,
    }
  ]
})
export class GoogleRecaptchaPageModule {}
