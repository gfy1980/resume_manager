import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform,AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from "@ngx-translate/core";
import { SqliteService } from "./services/sqlite.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  backButtonPressed: boolean = false;
  url: any = '/login-quite';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private router:Router,
    private alertController:AlertController,
    private sqliteService: SqliteService,
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.initTranslate();
      this.initializeApp();
      this.initSqlite();
      this.backButtonEvent();
    });
  }

  initializeApp() {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  initTranslate() {
    // --- set i18n begin ---  
    // 添加语言支持
    this.translateService.addLangs(["zh", "en", "jp"]);
    // 设置默认语言，一般无法匹配的时候使用
    this.translateService.setDefaultLang("jp");
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/zh|en|jp/) ? browserLang : 'jp');
    // this.translateService.use('jp');
    // --- set i18n end ---
    // 也可以将语言存在缓存中，供切换语言时，其他模块同时读取到语言的变化
    // sessionStorage.setItem("language",'en');
  }

  initSqlite() {
    // this.sqliteService.initDatabase();
  }
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url == '/login-quite') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          // navigator['app'].exitApp(); //退出APP
        } else {
          this.presentAlertConfirm();
          this.lastTimeBackPress = new Date().getTime();//再按
        }
        // navigator['app'].exitApp(); //ionic4 退出APP的方法
      }
    })

  }

  async presentAlertConfirm() {
    let msg011 = "";
    let btnOk = "";
    let btnCancel = "";
    this.translateService.get('commonMsg.msg011').subscribe((value) => {
      msg011 = value;
    });
    this.translateService.get('common.ok').subscribe((value) => {
      btnOk = value;
    });
    this.translateService.get('common.cancel').subscribe((value) => {
      btnCancel = value;
    });
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: msg011,
      buttons: [
        {
          text: btnCancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: btnOk,
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
