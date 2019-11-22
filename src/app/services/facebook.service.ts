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
    // this.facebook.login(['public_profile', 'email']).then((response) => {
    //   console.log('Logged into Facebook!', response)
    // }, (err) => {

    // });
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
    // let userData = await this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture)', []);
    // console.log(userData); // 用户信息
    // alert(JSON.stringify(userData));

    Facebook.api('/me?fields=id,name,picture', ['public_profile']).then((response) => {
      console.log(response);
      alert(response);
      // this.dataService.fbid = response.id;
      // this.dataService.username = response.name;
      // this.dataService.picture = response.picture.data.url;
      // 個人スマホン画面へ
      this.commonService.forward('/tabs-personal');
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
