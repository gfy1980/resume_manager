import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
import { WechatService } from '../../services/wechat.service';
import { FacebookService } from '../../services/facebook.service';
/**
 *
 *
 * @export そのたのオプション
 * @class OtherOptionPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-other-option',
  templateUrl: './other-option.page.html',
  styleUrls: ['./other-option.page.scss'],
})
export class OtherOptionPage extends BaseUI implements OnInit {
  // wechatイメージURL
  public wechatSrc: string;
  // facebookイメージURL
  public facebookSrc: string;
  public statuteCbx: boolean;
  private msg006: string;
  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
    public wechatService: WechatService,
    public facebookService: FacebookService,
  ) {
    super();
  }
  /**
   * 画面初期化
   *
   * @memberof OtherOptionPage
   */
  ngOnInit() {
    this.wechatSrc = "./assets/imgs/wechat.png";
    this.facebookSrc = "./assets/imgs/facebook.png";
    this.statuteCbx = true;
    // this.commonService.backButtonEvent();
  }

  ngOnDestroy(){
  }
  /**
   * 戻し
   *
   * @memberof OtherOptionPage
   */
  async doBack() {
    // クイックログイン画面へ
    this.commonService.back('/login-quite');
  }

  /**
   * アカウント作成
   *
   * @memberof OtherOptionPage
   */
  async toAccountCreate() {
    // アカウントを作成画面へ
    this.commonService.forward('/account-create');
  }

  
  /**
   * Wechatログイン
   *
   * @memberof LoginQuitePage
   */
  async doWechatLogin() {
    if (!this.statuteCbx) {
      this.translateService.get('commonMsg.msg006').subscribe((value) => {
        this.msg006 = value;
      });
      super.showToast(this.toastCtrl, this.msg006);
      return false;
    }
    if (this.commonService.isMobile()) {
      this.wechatService.wechatLogin();
    } else {
      // 测试用
      this.commonService.storageSet('wechatLogin', 1);
      this.commonService.root('/login-quite');
    }
  }

  /**
   * Facebookログイン
   *
   * @memberof LoginQuitePage
   */
  async doFacebookLogin() {
    
    if (!this.statuteCbx) {
      this.translateService.get('commonMsg.msg006').subscribe((value) => {
        this.msg006 = value;
      });
      super.showToast(this.toastCtrl, this.msg006);
      return false;
    }

    console.log("doFacebookLogin");
    if (this.commonService.isMobile()) {
      this.facebookService.facebookLogin();
    } else {
      // 测试用
      this.commonService.storageSet('facebookLogin', 1);
      this.commonService.root('/login-quite');
    }
  }
}
