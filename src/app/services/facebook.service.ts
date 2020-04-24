import { Injectable } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from '../services/common.service';
// import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx'
import { Facebook } from '@ionic-native/facebook';
// declare var Facebook;

/**
 * 
 * Facebook登録
 * @export
 * @class FacebookService
 */
@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor(
    public loadingCtrl: LoadingController,
    public plt: Platform,
    public translateService: TranslateService,
    public commonService: CommonService,
    // private facebook: Facebook,
  ) { }


  async facebookLogin() {
    let loading = await this.showLoading("");
    try {
      Facebook.login(['public_profile']).then((response) => {
        this.doFacebookLogin();
      }, (err) => {
        console.log(err);
        this.translateService.get('commonMsg.msg008').subscribe((value) => {
          alert(value);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingCtrl.dismiss();
    }
  }

  doFacebookLogin() {
    Facebook.api('/me?fields=id,name,picture', ['public_profile']).then((response) => {
      console.log(response);
      let fbid = response.id;
      let nickname = response.name;
      let headimgurl = response.picture.data.url;
      this.commonService.storageSet('fb_headimgurl', headimgurl);
      this.commonService.storageSet('fb_nickname', nickname);
      this.commonService.storageSet('fbid', fbid);
      this.commonService.storageSet('facebookLogin', 1);
      // 個人スマホン画面へ
      this.commonService.root('/login-quite');
    }, (err) => {
    });
  }

  facebookLogout(): void {
    Facebook.logout();
  }


  /**
 * loading加载页面
 * @param {LoadingController} loadingCtrl
 * @param {string} message
 * @returns {Loading}
 * @memberof BaseUI
 */
  protected async showLoading(message: string) {
    const loader = await this.loadingCtrl.create({
      message: message,
      //duration: 2000,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loader.present();
    return loader;
  }
}
