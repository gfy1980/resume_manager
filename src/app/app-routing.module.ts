import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login-quite', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login-quite', loadChildren: './pages/login-quite/login-quite.module#LoginQuitePageModule' },
  { path: 'forget', loadChildren: './pages/forget/forget.module#ForgetPageModule' },
  { path: 'other-option', loadChildren: './pages/other-option/other-option.module#OtherOptionPageModule' },
  { path: 'account-create', loadChildren: './pages/account-create/account-create.module#AccountCreatePageModule' },
  { path: 'company-account', loadChildren: './pages/company-account/company-account.module#CompanyAccountPageModule' },
  { path: 'personal-account', loadChildren: './pages/personal-account/personal-account.module#PersonalAccountPageModule' },
  { path: 'idcard-positive', loadChildren: './pages/idcard-positive/idcard-positive.module#IdcardPositivePageModule' },
  { path: 'idcard-back', loadChildren: './pages/idcard-back/idcard-back.module#IdcardBackPageModule' },
  { path: 'account-create-finish', loadChildren: './pages/account-create-finish/account-create-finish.module#AccountCreateFinishPageModule' },
  { path: 'password-create', loadChildren: './pages/password-create/password-create.module#PasswordCreatePageModule' },
  { path: 'pledge', loadChildren: './pages/pledge/pledge.module#PledgePageModule' },
  { path: 'google-recaptcha', loadChildren: './pages/google-recaptcha/google-recaptcha.module#GoogleRecaptchaPageModule' },
  { path: 'account-confirmation-finish', loadChildren: './pages/account-confirmation-finish/account-confirmation-finish.module#AccountConfirmationFinishPageModule' },
  { path: 'tabs-personal', loadChildren: './pages/tabs-personal/tabs-personal.module#TabsPersonalPageModule' },
  { path: 'tabs-company', loadChildren: './pages/tabs-company/tabs-company.module#TabsCompanyPageModule' },
  { path: 'company-info', loadChildren: './pages/company-info/company-info.module#CompanyInfoPageModule' },
  { path: 'file', loadChildren: './pages/file/file.module#FilePageModule' },
  { path: 'file-edit', loadChildren: './pages/file-edit/file-edit.module#FileEditPageModule' },
  { path: 'affiliation', loadChildren: './pages/affiliation/affiliation.module#AffiliationPageModule' },
  { path: 'password-change-finish', loadChildren: './pages/password-change-finish/password-change-finish.module#PasswordChangeFinishPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
