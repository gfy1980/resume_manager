import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPersonalPage } from './tabs-personal.page';
import { TranslateModule }from "@ngx-translate/core";
const routes: Routes = [
  {
    path: '',
    component: TabsPersonalPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'file',
        children: [
          {
            path: '',
            loadChildren: '../file/file.module#FilePageModule'
          }
        ]
      },
      {
        path: 'wallet',
        children: [
          {
            path: '',
            loadChildren: '../wallet/wallet.module#WalletPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs-personal/home',
    pathMatch: 'full'
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
  declarations: [TabsPersonalPage]
})
export class TabsPersonalPageModule { }
