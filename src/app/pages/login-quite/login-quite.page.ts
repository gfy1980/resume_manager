import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { WechatService } from '../../services/wechat.service';
import { FacebookService } from '../../services/facebook.service';
import { CommonService } from '../../services/common.service';
/**
 *
 * @export クイックログイン
 * @class LoginQuitePage
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login-quite',
  templateUrl: './login-quite.page.html',
  styleUrls: ['./login-quite.page.scss'],
})
export class LoginQuitePage implements OnInit {
  // LogoイメージURL
  public logoSrc: string;
  // wechatイメージURL
  public wechatSrc: string;
  // facebookイメージURL
  public facebookSrc: string;
  constructor(
    public translateService: TranslateService,
    public wechatService: WechatService,
    public facebookService: FacebookService,
    public commonService: CommonService,
  ) { 
    console.log("1")
  }
    ionViewWillEnter() {
      console.log("3")
    }
  /**
   * 画面初期化
   * @memberof LoginQuitePage
   */
  ngOnInit() {
    console.log("2")
    this.logoSrc = "./assets/imgs/logo.png";
    this.wechatSrc = "./assets/imgs/wechat.png";
    this.facebookSrc = "./assets/imgs/facebook.png";
  }
  /**
   * ログイン画面へ
   * @memberof LoginQuitePage
   */
  async toLogin() {
    this.commonService.forward('/login');
  }
  /**
   * そのたのオプション画面へ
   *
   * @memberof LoginQuitePage
   */
  async toOtherOption() {
    this.commonService.forward('/other-option');
  }

  /**
   * Wechatログイン
   *
   * @memberof LoginQuitePage
   */
  async doWechatLogin() {
    if (this.commonService.isMobile()) {
      this.wechatService.wechatLogin();
    }
  }

  /**
   * Facebookログイン
   *
   * @memberof LoginQuitePage
   */
  async doFacebookLogin() {
    if (this.commonService.isMobile()) {
      this.facebookService.facebookLogin();
    }
  }
}
