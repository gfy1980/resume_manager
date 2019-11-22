import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { CommonService } from '../../services/common.service';
import { BaseUI } from '../common/baseui';

/**
 * @export ログイン
 * @class LoginPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseUI implements OnInit {
  @ViewChild('usernameInput', { static: true }) usernameInput:any;
  @ViewChild('passwordInput', { static: true }) passwordInput:any;
  // LOGO
  public logoSrc: string;
  // ユーザID
  public username: string;
  // パスワード
  public password: string;

  public statuteCbx: boolean;
  // 入力チェックエラー情報
  private msg002: string;
  private msg003: string;
  private msg006: string;
  // ユーザID
  private userNameTitle: string;
  // パスワード
  private passwordTitle: string;
  constructor(
    public commonService: CommonService,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public ele: ElementRef,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof LoginPage
   */
  ngOnInit() {
    this.logoSrc = "./assets/imgs/logo.png";
    this.username = '';
    this.password = '';
    this.statuteCbx = true;
    this.translateService.get('loginPage.account').subscribe((value) => {
      this.userNameTitle = value;
    });
    this.translateService.get('loginPage.password').subscribe((value) => {
      this.passwordTitle = value;
    });
  }

  /**
   * 戻る
   *
   * @memberof LoginPage
   */
  async doBack() {
    // クイックログイン画面へ
    this.commonService.back('/login-quite');
  }

  /**
   * ログイン
   *
   * @memberof LoginPage
   */
  async toLogin() {
    if (this.doSubmitCheck()) {
      this.getData();
    }
    // this.nav.navigateRoot('/tabs-personal');
  }
  /**
   * ID、パスワードをお忘れの場合
   *
   * @memberof LoginPage
   */
  async toForget() {
    // ID、パスワードをお忘れ画面へ
    this.commonService.forward('/forget');
  }


  /**
   * サーバからログイン情報を取得する
   *
   * @memberof LoginPage
   */
  getData() {
    const api = '/login';
    let loading;
    this.translateService.get('common.waitting').subscribe((value) => {
       loading = super.showLoading(this.loadingCtrl, value);
    });
    const body = JSON.stringify([
      {
        "mail": this.username,
        "password": this.username
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
      }, 500);
      if (response.success) {
        this.saveInputData();
        this.commonService.forward('/tabs-personal');
      } else {
        alert(response.message);
      }
    }, (error) => {
      setTimeout(() => {
        this.loadingCtrl.dismiss();
      }, 500);
    });
  }


  saveInputData() {
    this.commonService.storageSet('username', this.username);
    this.commonService.storageSet('password', this.password);
  }

  /**
   *
   * 入力内容チェック
   * @private
   * @returns
   * @memberof LoginPage
   */
  private doSubmitCheck() {
    if (this.username == "") {
      this.translateService.get('commonMsg.msg002', { param: this.userNameTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.usernameInput.setFocus();
      return false;
    }

    if (this.password == "") {
      this.translateService.get('commonMsg.msg002', { param: this.passwordTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.passwordInput.setFocus();
      return false;
    }
    // メールチェック
    const ischeck = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.username);
    if (!ischeck) {
      this.translateService.get('commonMsg.msg003').subscribe((value) => {
        this.msg003 = value;
      });
      super.showToast(this.toastCtrl, this.msg003);
      this.usernameInput.setFocus();
      return false;
    }

    if (!this.statuteCbx) {
      this.translateService.get('commonMsg.msg006').subscribe((value) => {
        this.msg006 = value;
      });
      super.showToast(this.toastCtrl, this.msg006);
      return false;
    }

    return true;
  }
}
