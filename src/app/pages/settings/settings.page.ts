import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends BaseUI implements OnInit {

  constructor(
    private translateService: TranslateService,
    private router: Router,
    public commonService: CommonService,
    private alertController: AlertController,
  ) {
    super();
  }

  ionViewWillEnter() {
    this.backButtonEvent();
  }
  
  ngOnInit(
  ) {
   
  }

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  backButtonEvent() {
    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
      navigator['app'].exitApp(); //退出APP
    } else {
      this.presentAlertConfirm();
      this.lastTimeBackPress = new Date().getTime();//再按
    }
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
            this.commonService.storageRemove('isLogin');
            // this.commonService.storageRemove('facebookLogin');
            // this.commonService.storageRemove('wechatLogin');
            // this.commonService.storageRemove('mailLogin');
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
