import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonService } from './services/common.service';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { RecaptchaModule } from 'ng-recaptcha';
import { SQLite } from "@ionic-native/sqlite/ngx";
import { Wechat } from '@ionic-native/wechat/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { LoadingController } from '@ionic/angular';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'md',  //配置android ios 都使用一个样式
      // backButtonText:"返回"  //配置默认的返回按钮
    }),
    IonicStorageModule.forRoot({
      name: 'dmsdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
    }),
    RecaptchaModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    SQLite,
    Camera,
    Wechat,
    File,
    FileTransfer,
    FileOpener,
    FilePath,
    FileChooser,
    InAppBrowser,
    AppVersion,
    AndroidPermissions,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
