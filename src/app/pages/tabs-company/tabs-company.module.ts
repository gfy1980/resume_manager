import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsCompanyPage } from './tabs-company.page';
import { TranslateModule }from "@ngx-translate/core";
const routes: Routes = [
  {
    path: '',
    component: TabsCompanyPage,
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
      // {
      //   path: 'search',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: '../search/search.module#SearchPageModule'
      //     }
      //   ]
      // },
      // {
      //   path: 'scout',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: '../scout/scout.module#ScoutPageModule'
      //     }
      //   ]
      // },
      // {
      //   path: 'home',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: '../settings/settings.module#SettingsPageModule'
      //     }
      //   ]
      // },
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
  declarations: [TabsCompanyPage]
})
export class TabsCompanyPageModule {}
