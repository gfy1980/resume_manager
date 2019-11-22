import { Injectable } from '@angular/core';
import { LoadingController, Platform } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from '../services/common.service';
// import { Wechat } from '@ionic-native/wechat/ngx';
declare var Wechat: any;
export interface WechatPayParam {
  partnerid: string;
  prepayid: string;
  noncestr: string;
  timestamp: string;
  sign: string;
}

/**
 * Wechat登録
 * @export
 * @class WechatService
 */
@Injectable({
  providedIn: 'root'
})
export class WechatService {
  private appId: string = "wx171c50e9c0e8a023";
  private appSecret: string = "f922f993044edcacc5ebe7f76a7ea1d1";

  constructor(
    public loadingCtrl: LoadingController,
    public plt: Platform,
    public commonService: CommonService,
    public translateService: TranslateService,
    // private wechat: Wechat,
  ) { }

  /**
   * Wechatインストールチェック
   *
   * @returns
   * @memberof WechatService
   */
  public isInstalled() {
    return new Promise((resolve, reject) => {
      Wechat.isInstalled(result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  /**
   *  Wechat支払
   *
   * @static
   * @param {WechatPayParam} params
   * @returns
   * @memberof WechatService
   */
  public static sendPaymentRequest(params: WechatPayParam) {
    return new Promise((resolve, reject) => {
      Wechat.sendPaymentRequest(params, result => {
        resolve(result);
      }, error => {
        reject(error);
      });
    });
  }

  public wechatAuth(scope, state) {
    return new Promise((resolve, reject) => {
      Wechat.auth(scope, state, response => {
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  async wechatLogin() {
    if (typeof Wechat === 'undefined' || !await this.isInstalled()) {
      this.translateService.get('commonMsg.msg007').subscribe((value) => {
        alert(value);
      });
      return;
    }
    this.doWeChatLogin();
  }

  async doWeChatLogin() {
    let loading = await this.showLoading("");
    try {
      let scope = "snsapi_userinfo",
        state = "_" + (+new Date());
      // 先用插件获取到code
      Wechat.auth(scope, state, (response) => {
        this.commonService.storageSet("openid", JSON.stringify(response));
        alert(JSON.stringify(response));
        // token和openid，用户信息都是要后台去请求微信接口
        // 個人スマホン画面へ
        // this.commonService.forward('/tabs-personal');
        // TODO: 下記ソース部分はサーバーで作成してください。
        // 获取token，openID
        let accessTokenUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.appId + '&secret=' + this.appSecret + '&code=' + response.code + '&grant_type=authorization_code';
        this.commonService.ajaxGet(accessTokenUrl).then((accessTokenResponse: any) => {
          console.log(accessTokenResponse);
          alert(JSON.stringify(accessTokenResponse));
          var accessToken = accessTokenResponse.access_token;
          var openId = accessTokenResponse.openid;
          // 获取用户信息
          let userInfoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId + '&lang=zh_CN';
          this.commonService.ajaxGet(userInfoUrl).then((userInfoResponse: any) => {
            console.log(userInfoResponse);
            alert(JSON.stringify(userInfoResponse));
            // openid    普通用户的标识，对当前开发者帐号唯一
            // nickname    普通用户昵称
            // sex    普通用户性别，1为男性，2为女性
            // province    普通用户个人资料填写的省份
            // city    普通用户个人资料填写的城市
            // country    国家，如中国为CN
            // headimgurl    用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
            // privilege    用户特权信息，json数组，如微信沃卡用户为（chinaunicom）
            // unionid    用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
            // 個人スマホン画面へ
            this.commonService.forward('/tabs-personal');
          });
        });
      }, (reason) => {
        // alert("Failed: " + reason);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingCtrl.dismiss();
    }
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
