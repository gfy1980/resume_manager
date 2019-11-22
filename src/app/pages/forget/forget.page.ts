import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { BaseUI } from '../common/baseui';
import { CommonService } from '../../services/common.service';

/**
 * @export パスワードを再設定
 * @class ForgetPage
 * @extends {BaseUI}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage extends BaseUI implements OnInit {
  @ViewChild('mailInput', { static: true }) mailInput:any;
  // メールアドレス
  public mail: string;
  // メッセージ
  private msg002: string;
  private msg003: string;
  // メールタイトル
  private mailTitle: string;
  constructor(
    public alertController: AlertController,
    public toastCtrl: ToastController,
    public commonService: CommonService,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService
  ) {
    super();
  }

  /**
   * 初期化
   *
   * @memberof ForgetPage
   */
  ngOnInit() {
    this.mail = '';
    this.msg002 = '';
    this.msg003 = '';
    this.translateService.get('forgetPage.mail').subscribe((value) => {
      this.mailTitle = value;
    });
  }

  /**
   * 戻る
   *
   * @memberof ForgetPage
   */
  async doBack() {
    // ログイン画面へ
    this.commonService.back('/login');
  }

  /**
   * 次へ
   *
   * @memberof ForgetPage
   */
  async doNext() {
    if (this.doSubmitCheck()) {
      this.postData();
    }
  }

  /**
   * パスワードを再設定送信
   *
   * @memberof ForgetPage
   */
  postData() {
    var api = '/forgetpassword';
    this.translateService.get('common.waitting').subscribe((value) => {
      let loading = super.showLoading(this.loadingCtrl, value);
    });
    let param = "";
    this.commonService.ajaxPost(api, param).then((response: any) => {
      this.loadingCtrl.dismiss();
      if (response.success) {
        // 送信完了画面へ
        this.commonService.forward('/password-change-finish', { queryParams: { email: this.mail } });
      }
    }, (error) => {
      this.loadingCtrl.dismiss();
      console.log(error);
    });
  }

  /**
   * 入力内容チェック
   *
   * @private
   * @returns
   * @memberof ForgetPage
   */
  private doSubmitCheck() {
    if (this.mail == "") {
      this.translateService.get('commonMsg.msg002', { param: this.mailTitle }).subscribe((value) => {
        this.msg002 = value;
      });
      super.showToast(this.toastCtrl, this.msg002);
      this.mailInput.setFocus();
      return false;
    }

    // メールチェック
    const ischeck = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.mail);
    if (!ischeck) {
      this.translateService.get('commonMsg.msg003').subscribe((value) => {
        this.msg003 = value;
      });
      super.showToast(this.toastCtrl, this.msg003);
      this.mailInput.setFocus();
      return false;
    }
    return true;
  }
}
