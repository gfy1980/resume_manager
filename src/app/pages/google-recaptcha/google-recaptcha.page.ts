import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';
/**
 *
 *
 * @export グーグルリップス
 * @class GoogleRecaptchaPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-google-recaptcha',
  templateUrl: './google-recaptcha.page.html',
  styleUrls: ['./google-recaptcha.page.scss'],
})
export class GoogleRecaptchaPage extends BaseUI implements OnInit {
  // お名前
  private username: string;
  // フリガナ
  private furigana: string;
  // 企業人事担当者フラグ
  private istoggled: string;
  // メール
  private email: string;
  // 会社コード
  private companycode: string;
  // 会社名称
  private companyname: string;
  // 会社URL
  private companyurl: string;
  // メールアドレス
  private companymail: string;
  // 身分証明書正面写真
  private idcardp: string;
  // 身分証明書裏面写真
  private idcardb: string;
  // パスワード
  private password: string;
  constructor(
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public commonService: CommonService,
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof GoogleRecaptchaPage
   */
  ngOnInit() {
  }

  /**
   * 戻る
   *
   * @memberof GoogleRecaptchaPage
   */
  async doBack() {
    // 誓約のお願い画面へ
    this.commonService.back('/pledge');
  }

  /**
   * リップス完了
   * @param {string} captchaResponse
   * @memberof GoogleRecaptchaPage
   */
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.getSubmitData();
    this.sendData();
  }

  /**
   * POSTデータを取得する
   *
   * @memberof AccountConfirmationFinishPage
   */
  getSubmitData() {
    // お名前
    this.commonService.storageGet('create_username').then((value: string) => {
      this.username = value;
    })
    // フリガナ
    this.commonService.storageGet('create_furigana').then((value: string) => {
      this.furigana = value;
    })
    // 企業人事担当者
    this.commonService.storageGet('create_istoggled').then((value: string) => {
      this.istoggled = value;
    })
    // メール
    this.commonService.storageGet('create_email').then((value: string) => {
      this.email = value;
    })
    // 会社コード
    this.commonService.storageGet('create_companycode').then((value: string) => {
      this.companycode = value;
    })
    // 会社名称
    this.commonService.storageGet('create_companyname').then((value: string) => {
      this.companyname = value;
    })
    // 会社URL
    this.commonService.storageGet('create_companyurl').then((value: string) => {
      this.companyurl = value;
    })
    // メールアドレス
    this.commonService.storageGet('create_companymail').then((value: string) => {
      this.companymail = value;
    })
    // 身分証明書正面写真
    this.commonService.storageGet('idcard-p').then((value: string) => {
      this.idcardp = 'data:image/jpeg;base64,' + value;
    })
    // 身分証明書裏面写真
    this.commonService.storageGet('idcard-b').then((value: string) => {
      this.idcardb = 'data:image/jpeg;base64,' + value;
    })
    // パスワード
    this.commonService.storageGet('create_password').then((value: string) => {
      this.password = value;
    })
  }

  submitDataClear(){
    this.commonService.storageRemove('create_username');
    this.commonService.storageRemove('create_furigana');
    this.commonService.storageRemove('create_istoggled');
    this.commonService.storageRemove('create_email');
    this.commonService.storageRemove('create_companycode');
    this.commonService.storageRemove('create_companyname');
    this.commonService.storageRemove('create_companyurl');
    this.commonService.storageRemove('create_companymail');
    this.commonService.storageRemove('idcard-p');
    this.commonService.storageRemove('idcard-b');
    this.commonService.storageRemove('create_password');
  }

  /**
 * サーバからログイン情報を取得する
 *
 * @memberof LoginPage
 */
  sendData() {
    const api = '/createaccount';
    this.translateService.get('common.waitting').subscribe((value) => {
      let loading = super.showLoading(this.loadingCtrl, value);
    });
    const body = JSON.stringify([
      {
        "istoggled": this.istoggled,// 個人、企業区分
        "username": this.username, // お名前
        "furigana": this.furigana, // フリガナ
        "mail": this.email, // メールアドレス
        "companycode": this.companycode, // 会社コード
        "companyname": this.companyname, // 会社名称
        "companyurl": this.companyurl, // 会社URL
        "idcardp": this.idcardp, // 写真１
        "idcardb": this.idcardb, // 写真２
        "password": this.idcardb, // パスワード
        // オプション
      }
    ]);
    this.commonService.ajaxPost(api, body).then((response: any) => {
      this.loadingCtrl.dismiss();
      if (response.success) {
        const token = response.result.token;
        const address = response.result.address;
        this.commonService.storageSet('token', token);
        this.commonService.storageSet('address', address);
        // アカウントを作成完了画面へ
        this.commonService.forward('/account-confirmation-finish');
      } else {
        alert(response.message);
      }
    }, (error) => {
      this.loadingCtrl.dismiss();
      console.log(error);
    });
  }
}
